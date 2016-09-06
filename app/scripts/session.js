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
  ready: function () {
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
          var sessionSpeakers = self.session.speaker;
          if (self.session.speaker) {
            self.speakers = json.speakers.filter(function(speaker) {
              return sessionSpeakers.indexOf(parseInt(speaker.id)) !== -1 ;
            });
          }
        }
      });

      var userid = localStorage['userid'];
      if (userid) {
        fetch('api/v1/stars/get?login=' + userid).then(function(response) {
          return response.json();
        }).then(function(json) {
          self.favorites = json.favs || [];
        });
      } else {
        self.favorites = JSON.parse(localStorage['fav']) || []
      }
    },
    getTrackColor: getTrackColor,
    getTypeColor: getTypeColor,
    isFavorite: isFavorite
  },
  events: {
    'toggle-favorite': function(id, favorite) {
      var userid = localStorage['userid'];
      toggleFavorite(id, favorite, this.favorites, userid)
    }
  }
});
