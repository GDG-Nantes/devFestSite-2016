/* eslint-disable */
const agendaTemplate =
'<div class="devfest-agenda2-hour-line" v-for="hour in hours">'
+ '  <div class="devfest-agenda2-hour-col mdl-typography--font-light">'
+ '    <span class="devfest-chip color-bg-default">{{hour.label}}</span>'
+ '    <div class="devfest-agenda2-hour-line">&nbsp;</div>'
+ '  </div>'
+ '  <div class="devfest-agenda2-hour-content">'
+ '   <agenda-slot v-for="session in this.getSessionByDayHour(parseInt(day), hour.id, this.sessions)" :session="session" :favorites="favorites"></agenda-slot>'
+ '  </div>'
+ '</div>'


var Agenda = Vue.extend({
  props: ['day', 'hours', 'sessions', 'favorites'],
  components: { 'agenda-slot': AgendaSlot },
  template: agendaTemplate,
  methods: {
    getSessionByDayHour: getSessionByDayHour
  }
})

Vue.component('agenda', Agenda)
