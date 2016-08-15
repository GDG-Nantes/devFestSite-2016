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

var sessionId = getUrlParameter('id');

var sessionVue = new Vue({
  el: '#sessionVue',
  data: {
    session: null,
    speaker: null,
    hour: null,
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
        console.log(sessionId)
        // get session
        self.session = json.sessions.filter(function(session) {
          return session.id === parseInt(sessionId);
        })[0];
        // get speakers
        var sessionSpeakers = self.session.speaker;
        self.speaker = json.speakers.filter(function(speaker) {
          return sessionSpeakers === parseInt(speaker.id);
        })[0];
        console.log(self.speaker)
        // get hour
        //var sessionHour = self.session.hour;
        //self.hour = json.hours[sessionHour];
      });
    },
    getTrackColor: function(track) {
      switch (track) {
        case 'web':
          return 'color-bg-web devfest-agenda-card-chip';
        case 'cloud':
          return 'color-bg-cloud devfest-agenda-card-chip';
        case 'mobile':
          return 'color-bg-mobile devfest-agenda-card-chip';
        case 'discovery':
          return 'color-bg-discovery devfest-agenda-card-chip';
        default:
          return 'color-bg-default devfest-agenda-card-chip';
      }
    },
    getTypeColor: function(type) {
      switch (type) {
        case 'conference':
          return 'color-bg-conference devfest-agenda-card-chip';
        case 'codelab':
          return 'color-bg-codelab devfest-agenda-card-chip';
        case 'quickie':
          return 'color-bg-quickie devfest-agenda-card-chip';
        default:
          return 'color-bg-default devfest-agenda-card-chip';
      }
    },
    getTimeLabel: function(type) {
      switch (type) {
        case 'keynote':
          return '40 min';
        case 'repas':
          return '40 min';
        case 'conference':
          return '40 min';
        case 'codelab':
          return '2 h';
        case 'quickie':
          return '20 min';
      }
    }
  }
});
