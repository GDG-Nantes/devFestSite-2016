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
    isFavorite: isFavorite
  },
  events: {
    'toggle-favorite': toggleFavorite
  }
});
