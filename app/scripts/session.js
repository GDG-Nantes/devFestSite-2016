/* eslint-disable */
var sessionId = getUrlParameter('id');

var sessionVue = new Vue({
  el: '#sessionVue',
  data: {
    agenda: null,
    session: null,
    speakers: null,
    favorites: []
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      var self = this;
      fetch('assets/devfest.json').then(function(response) {
        return response.json();
      }).then(function(json) {
        // get agenda
        self.agenda = json.agenda;
        // get session
        self.session = json.sessions.filter(function(session) {
          return session.id === parseInt(sessionId);
        })[0];
        // get speakers
        if (self.session) {
          var sessionSpeakers = self.session.speakers;
          self.speakers = json.speakers.filter(function(speaker) {
            return sessionSpeakers.indexOf(parseInt(speaker.id)) !== -1 ;
          });
        }
      });

      fetch('api/v1/stars/get?login=ben').then(function(response) {
        return response.json();
      }).then(function(json) {
        self.favorites = json.favs;
      });
    },
    getTrackColor: getTrackColor,
    getTypeColor: getTypeColor,
    isFavorite: function(id, favs) {
      console.log('isFavorite')
      console.log(id)
      console.log(favs)
      if (favs) {
        return favs.indexOf(id.toString()) !== -1
      } else {
        return false
      }
    }
  },
  events: {
    'toggle-favorite': function (id, favorite) {
      console.log('event toggle-favorite')
      console.log(id)
      console.log(favorite)
      var newFavs = []
      if (this.favorites) {
        console.log('exist favs ' + this.favorites)
        var index = this.favorites.indexOf(id.toString());
        if (index !== -1 && !favorite) {
          newFavs = this.favorites.splice(index, 1);
          console.log('remove ' + id + '>' + newFavs)
        } else if (favorite) {
          this.favorites.push(id.toString());
          newFavs = this.favorites;
          console.log('add ' + id + '>' + this.favorites)
        }
      } else if (favorite) {
        console.log('add first fav ' + id)
        newFavs = [id.toString()]
      }
      console.log(newFavs)
      fetch('api/v1/stars/put?login=ben&favs=' + JSON.stringify(newFavs)).then(function(response) {
        console.log(response);
      })
      this.favorites = newFavs;
    }
  }
});
