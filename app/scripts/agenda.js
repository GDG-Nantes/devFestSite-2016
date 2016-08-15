/* eslint-disable */
const sessionTemplate =
'<div class="devfest-agenda-card" onClick="location.href=\'fiche_session.html?id={{session.id}}\';">'
+ '<div>'
+ '  <img src="./images/speakers/amoussine.jpg" class="devfest-agenda-card-img" />'
+ '</div>'
+ '<div class="devfest-agenda-card-content">'
+ '  <span class="devfest-agenda-card-content-session">{{ session.name }}</span>'
+ '  <div class="devfest-agenda-card-content-speaker" v-if="session.speaker">Par {{ this.getSpeaker(session.speaker) }}</div>'
+ '  <div class="devfest-agenda-card-content-info-tags">'
+ '    <span class={{this.getTrackColor(session.track)}}>{{ session.track }}</span>'
+ '    <span class={{this.getTypeColor(session.type)}}>{{ session.type }}</span>'
+ '    <span class="devfest-agenda-card-chip color-bg-default">{{this.getTimeLabel(session.type)}}</span>'
+ '    <span class="devfest-agenda-card-chip color-bg-default">{{ session.agenda.room }}</span>'
+ '  </div>'
+ '</div>'
+ '</div>'

var Session = Vue.extend({
  props: {
    session: Object
  },
  template: sessionTemplate,
  methods: {
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
    },
    getSpeaker: function(id) {
      var speaker = this.$root.speakers.filter(function(s) {
        return s.id === id
      })[0];
      var company = speaker.company !== null ? ' (' + speaker.company + ')' : ''
      return speaker.firstname + ' ' + speaker.name + company;
    }
  }
})

Vue.component('session', Session)

const agendaTemplate =
'<div class="devfest-agenda2-hour-line" v-for="hour in hours">'
+ '  <div class="devfest-agenda2-hour-col">'
+ '    <span class="devfest-agenda-card-chip color-bg-default">{{hour.label}}</span>'
+ '    <div class="devfest-agenda2-hour-line">&nbsp;</div>'
+ '  </div>'
+ '  <div class="devfest-agenda2-hour-content">'
+ '   <session v-for="session in this.getSession(parseInt(day), hour.id)" :session="session"></session>'
+ '  </div>'
+ '</div>'


var Agenda = Vue.extend({
  props: ['day', 'hours', 'sessions'],
  components: { 'session': Session },
  template: agendaTemplate,
  methods: {
    getSession: function(day, hour) {
      return this.sessions.filter(function(s) {
        return s.agenda.day === day && s.agenda.hour === hour
      })
    }
  }
})

Vue.component('agenda', Agenda)

var agendaVue = new Vue({
  el: '#agendaVue',
  data: {
    sessions: null,
    speakers: null,
    agenda: null
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
        self.sessions = json.sessions;
        self.speakers = json.speakers;
        self.agenda = json.agenda;
      });
    }
  }
});
