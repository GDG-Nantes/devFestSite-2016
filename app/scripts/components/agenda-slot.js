/* eslint-disable */
const agendaSlotTemplate =
'<div class="devfest-agenda-card">'
+ '<div class="devfest-agenda-card-avatars mdl-cell--hide-phone">'
+ '  <img v-if="session.image" :src="session.image" class="devfest-agenda-card-img" />'
+ '  <img v-if="session.speaker" v-for="speaker in session.speaker" :src="this.getSpeakerPhoto(speaker, this.$root.speakers)" class="devfest-agenda-card-img" />'
+ '</div>'
+ '<a class="devfest-agenda-card-content" href="./session.html?id={{session.id}}">'
+ '  <span class="devfest-agenda-card-content-session mdl-typography--font-light">{{ session.name }}</span>'
+ '  <div class="devfest-agenda-card-content-speaker  mdl-typography--font-light" v-if="session.speaker">'
+ '    {{ this.getSpeakers(session.speaker, this.$root.speakers) }}'
+ '  </div>'
+ '  <div class="devfest-agenda-card-content-info-tags">'
+ '    <span v-if="session.track" class={{this.getTrackColor(session.track)}}>{{ session.track }}</span>'
+ '    <span v-if="session.type" class={{this.getTypeColor(session.type)}}>{{ session.type }}</span>'
+ '    <span v-if="session.type" class="devfest-chip color-bg-default">{{this.getTimeLabel(session.type)}}</span>'
+ '    <span v-if="session.agenda.room" class="devfest-chip color-bg-default">{{this.getRoomLabel(session.agenda.room) }}</span>'
+ '  </div>'
+ '</a>'
+ '<div style="align-self:flex-start"><favorite :sid="session.id" :active="isFavorite(session.id, favorites)" ></favorite></div>'
+ '<div style="align-self:flex-start" v-if="session.videoUrl"><a href={{session.videoUrl}} target="_NEW"><i class="material-icons">videocam</i></a></div>'
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
