/* eslint-disable */
const sessionCardTemplate =
'<div class="devfest-session-card mdl-color--white shadowLight">'
+'  <div class="devfest-session-card-title">'
+'    <h4 v-if="displayTitle" class="mdl-card__title-text">{{ session.name }}</h4>'
+'    <favorite :sid="session.id" :active="fav" ></favorite>'
+'  </div>'
+'  <span v-if="displayTitle" class={{this.getTrackColor(session.track)}}>{{ session.track }}</span>'
+'  <span v-if="session.type" class={{this.getTypeColor(session.type)}}>{{ session.type }}</span>'
+'  <span class="devfest-chip color-bg-default">{{this.getDayLabel(session.agenda.day)}}</span>'
+'  <span class="devfest-chip color-bg-default">{{this.getHourLabel(session.agenda.day, session.agenda.hour, agenda)}}</span>'
+'  <span v-if="session.agenda.room" class="devfest-chip color-bg-default">{{this.getRoomLabel(session.agenda.room)}}</span>'
+'  <span v-if="session.type" class="devfest-chip color-bg-default">{{this.getTimeLabel(session.type)}}</span>'
+'  <span class="devfest-chip color-bg-default">{{this.getLangLabel(session.lang)}}</span>'
+'  <span v-if="session.difficulty" class="devfest-chip color-bg-default">{{this.getDifficultyLabel(session.difficulty)}}</span>'
+'  <div class="devfest-session-desc mdl-typography--font-light">'
+'    {{{session.description}}}'
+'  </div>'
+'</div>'

var SessionCard = Vue.extend({
  props: {
    agenda: Object,
    session: Object,
    fav:  {
      type: Boolean,
      default: false
    },
    displayTitle: {
      type: Boolean,
      default: true
    }
  },
  template: sessionCardTemplate,
  components: { 'favorite': Favorite },
  methods: {
    getTimeLabel: getTimeLabel,
    getDayLabel: getDayLabel,
    getHourLabel: getHourLabel,
    getTrackColor: getTrackColor,
    getTypeColor: getTypeColor,
    getDifficultyLabel: getDifficultyLabel,
    getLangLabel: getLangLabel,
    getRoomLabel: getRoomLabel
  }
})

Vue.component('session-card', SessionCard)
