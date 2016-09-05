/* eslint-disable */
const agendaSlotTemplate =
'<div class="devfest-agenda-card" onClick="location.href=\'session.html?id={{session.id}}\';">'
+ '<div class="devfest-agenda-card-avatars mdl-cell--hide-phone">'
+ '  <img v-if="session.image" :src="session.image" class="devfest-agenda-card-img" />'
+ '  <img v-for="speaker in session.speaker" src="{{this.getSpeakerPhoto(speaker, this.$root.speakers)}}" class="devfest-agenda-card-img" />'
+ '</div>'
+ '<div class="devfest-agenda-card-content">'
+ '  <span class="devfest-agenda-card-content-session mdl-typography--font-light">{{ session.name }}</span>'
+ '  <div class="devfest-agenda-card-content-speaker  mdl-typography--font-light" v-if="session.speaker">'
+ '    Par {{ this.getSpeakers(session.speaker, this.$root.speakers) }}'
+ '  </div>'
+ '  <div class="devfest-agenda-card-content-info-tags">'
+ '    <span v-if="session.track" class={{this.getTrackColor(session.track)}}>{{ session.track }}</span>'
+ '    <span v-if="session.type" class={{this.getTypeColor(session.type)}}>{{ session.type }}</span>'
+ '    <span v-if="session.type" class="devfest-chip color-bg-default">{{this.getTimeLabel(session.type)}}</span>'
+ '    <span v-if="session.agenda.room" class="devfest-chip color-bg-default">{{this.getRoomLabel(session.agenda.room) }}</span>'
+ '  </div>'
+ '</div>'
+ '<div style="align-self:flex-start"><favorite :sid="session.id" :active="isFavorite(session.id, favorites)" ></favorite></div>'
+ '</div>'

var AgendaSlot = Vue.extend({
  props: {
    favorites: Array,
    session: Object
  },
  template: agendaSlotTemplate,
  methods: {
    getTrackColor: getTrackColor,
    getTypeColor: getTypeColor,
    getTimeLabel: getTimeLabel,
    getSpeakers: getSpeakers,
    isFavorite: isFavorite,
    getSpeakerPhoto: getSpeakerPhoto,
    getRoomLabel: getRoomLabel
  }
})

Vue.component('agenda-slot', AgendaSlot)
