/* eslint-disable */
const speakerCardTemplate =
'<div class="devfest-speaker-card shadowLight" v-on:click="goToSpeakerPage($event, speaker.id)">'
+ '<div class="mdl-cell--hide-phone">'
+ '  <img src="./images/speakers/amoussine.jpg" class="devfest-speaker-card-img" />'
+ '</div>'
+ '<div class="devfest-speaker-card-content">'
+ '  <div class="devfest-speaker-card-title">'
+ '    <img src="./images/speakers/amoussine.jpg" class="devfest-speaker-card-img-sm mdl-cell--hide-tablet mdl-cell--hide-desktop" />'
+ '    <div>'
+ '      <h5>{{ speaker.firstname }} {{ speaker.name }}</h5>'
+ '      <h6 v-if="speaker.company">{{ speaker.company }}</h6>'
+ '    </div>'
+ '    <div style="position: relative">'
+ '      <social-chip v-if="speaker.social.twitter" type="twitter" :value="speaker.social.twitter"></social-chip>'
+ '      <social-chip v-if="speaker.social.googleplus" type="googleplus" :value="speaker.social.googleplus"></social-chip>'
+ '      <social-chip v-if="speaker.social.github" type="github" :value="speaker.social.github"></social-chip>'
+ '    </div>'
+ '  </div>'
+ '  <div class="mdl-typography--font-light">{{{ speaker.bio }}}</div>'
+ '</div>'
+ '</div>'

var SpeakerCard = Vue.extend({
  props: {
    speaker: Object
  },
  components: { 'social-chip': SocialChip },
  template: speakerCardTemplate,
  methods: {
    goToSpeakerPage: function(event, id) {
      event.stopPropagation();
      if (event.target.id !== 'devfest-chip') {
        location.href='speaker.html?id=' + id;
      }
    }
  }
})

Vue.component('speaker-card', SpeakerCard)
