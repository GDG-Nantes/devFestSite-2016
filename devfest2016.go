package devfest

import (
	"appengine"
	"appengine/datastore"
	"appengine/memcache"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
)

type User struct {
	Favs  []string `json:"favs"`
	Login string   `json:"login"`
}

func init() {
	http.HandleFunc("/api/v1/stars/get", getStars)
	http.HandleFunc("/api/v1/stars/put", putStars)
	http.HandleFunc("/.well-known/acme-challenge/", challengeHandler)

}

var challenges = map[string]string{
	"p2klN0EWUDV9MlBnBtb1Y2LcP_L_mpms_EWTO3lGl2c": "p2klN0EWUDV9MlBnBtb1Y2LcP_L_mpms_EWTO3lGl2c.OP4FQxU38q3M4exDafQxKv95f4ALBOpfV7FaLbYnI04",
	"hello": "world",
}

func challengeHandler(w http.ResponseWriter, r *http.Request) {
	challenge := strings.Split(r.RequestURI, "/.well-known/acme-challenge/")[1]
	if responseToChallenge, ok := challenges[challenge]; !ok {
		http.Error(w, "Error", http.StatusNotFound)
		return
	} else {
		fmt.Fprintf(w, "%s", responseToChallenge)
	}
}

func getStars(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	//w.Header().Set("SUPER-HACK", "@GDGNANTES")
	//w.WriteHeader(http.StatusFound)
	c := appengine.NewContext(r)

	login, _ := url.QueryUnescape(r.FormValue("login"))
	//favs := r.FormValue("favs")
	// Mise en cache direct du spreadsheet
	keyMemCache := "favs" + login
	item, err := memcache.Get(c, keyMemCache)
	var strJson []byte
	if err == memcache.ErrCacheMiss || err != nil {

		// Si c'est pas en cache, on regarde si c'est en base
		var user User
		keyUser := datastore.NewKey(c, "User", keyMemCache, 0, nil)
		if err := datastore.Get(c, keyUser, &user); err != nil {
			// Si c'est pas présent en base, alors on renvoie un tableau vide
			user = User{
				Login: login,
				Favs:  []string{},
			}
		}

		tmpStrJson, _ := json.Marshal(user)
		strJson = tmpStrJson
		itemValue := &memcache.Item{
			Key:   keyMemCache,
			Value: strJson,
		}
		// On ajoute dans le memcache
		if err := memcache.Add(c, itemValue); err == memcache.ErrNotStored {
			c.Infof("itemValue with key %q already exists", itemValue.Key)
		} else if err != nil {
			c.Errorf("error adding itemValue: %v", err)
		}

	} else {
		strJson = item.Value
	}
	fmt.Fprintf(w, "%s\n", strJson)

}

func putStars(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	login, _ := url.QueryUnescape(r.FormValue("login"))
	favs, _ := url.QueryUnescape(r.FormValue("favs"))
	if len(login) == 0 || len(favs) == 0 {
		fmt.Fprint(w, "Parametre manquant\n")
		// TODO jetter une erreur
		return
	}
	fmt.Fprint(w, login+"\n")
	fmt.Fprint(w, favs+"\n")

	c := appengine.NewContext(r)

	// Get the item from the dataStore
	keyMemCache := "favs" + login
	var user = User{
		Login: login,
	}
	keyUser := datastore.NewKey(c, "User", keyMemCache, 0, nil)
	json.Unmarshal([]byte(favs), &user.Favs)

	_, err := datastore.Put(c, keyUser, &user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// On met à jour aussi le memcache
	strJson, _ := json.Marshal(user)
	itemValue := &memcache.Item{
		Key:   keyMemCache,
		Value: strJson,
	}
	if err := memcache.Set(c, itemValue); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
