/* eslint-disable */
var sessionId = getUrlParameter('id');

var sessionVue = new Vue({
  el: '#sessionVue',
  data: {
    agenda: null,
    session: null,
    speaker: null
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
          var sessionSpeakers = self.session.speaker;
          self.speaker = json.speakers.filter(function(speaker) {
            return sessionSpeakers === parseInt(speaker.id);
          })[0];
        }
      });
    },
    getTrackColor: getTrackColor,
    getTypeColor: getTypeColor
  }
});
