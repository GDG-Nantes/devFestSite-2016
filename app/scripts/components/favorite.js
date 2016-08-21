/* eslint-disable */
const favoriteTemplate =
'<span class="devfest-favorite" v-on:click="toggleFavorite">'
+ '<span v-if="active" class="devfest-favorite-active"><i class="material-icons">favorite</i></span>'
+ '<span v-else class="devfest-favorite-unactive"><i class="material-icons">favorite_border</i></span>'
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
