/* eslint-disable */
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

var sessionId = getUrlParameter('session');

var sessionVue = new Vue({
  el: '#sessionVue',
  data: {
    session: null,
    speakers: null,
    hour: null,
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      var self = this;
      fetch('assets/prog.json').then(function(response) {
        return response.json();
      }).then(function(json) {
        // get session
        self.session = json.sessions.filter(function(session) {
          return session.id === sessionId;
        })[0];
        // get speakers
        var sessionSpeakers = self.session.speakers;
        self.speakers = json.speakers.filter(function(speaker) {
          return sessionSpeakers.indexOf(speaker.id) !== -1;
        });
        // get hour
        var sessionHour = self.session.hour;
        self.hour = json.hours[sessionHour];
      });
    }
  }
});
