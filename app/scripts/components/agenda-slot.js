/* eslint-disable */
const agendaSlotTemplate =
'<div class="devfest-agenda-card" onClick="location.href=\'session.html?id={{session.id}}\';">'
+ '<div>'
+ '  <img src="./images/speakers/amoussine.jpg" class="devfest-agenda-card-img" />'
+ '</div>'
+ '<div class="devfest-agenda-card-content">'
+ '  <span class="devfest-agenda-card-content-session mdl-typography--font-light">{{ session.name }}</span>'
+ '  <div class="devfest-agenda-card-content-speaker  mdl-typography--font-light" v-if="session.speaker">Par {{ this.getSpeaker(session.speaker, this.$root.speakers) }}</div>'
+ '  <div class="devfest-agenda-card-content-info-tags">'
+ '    <span class={{this.getTrackColor(session.track)}}>{{ session.track }}</span>'
+ '    <span class={{this.getTypeColor(session.type)}}>{{ session.type }}</span>'
+ '    <span class="devfest-chip color-bg-default">{{this.getTimeLabel(session.type)}}</span>'
+ '    <span class="devfest-chip color-bg-default">{{ session.agenda.room }}</span>'
+ '  </div>'
+ '</div>'
+ '</div>'

var AgendaSlot = Vue.extend({
  props: {
    session: Object
  },
  template: agendaSlotTemplate,
  methods: {
    getTrackColor: getTrackColor,
    getTypeColor: getTypeColor,
    getTimeLabel: getTimeLabel,
    getSpeaker: getSpeaker
  }
})

Vue.component('agenda-slot', AgendaSlot)
