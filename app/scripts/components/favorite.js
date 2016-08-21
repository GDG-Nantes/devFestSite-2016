/* eslint-disable */
const favoriteTemplate =
'<span class="devfest-favorite" v-on:click="toggleFavorite">'
+ '<span v-if="active">J\'aime</span>'
+ '<span v-else>J\'aime pas</span>'
+ '</span>'

var Favorite = Vue.extend({
  props: {
    sid: Number,
    active : {
      type: Boolean,
      default: false
    }
  },
  template: favoriteTemplate,
  methods: {
    toggleFavorite: function(event) {
      event.stopPropagation();
      this.$dispatch('toggle-favorite', this.sid, !this.active)
      this.active = !this.active;
    }
  }
})

Vue.component('favorite', Favorite)
