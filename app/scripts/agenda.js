/* eslint-disable */
var agendaVue = new Vue({
  el: '#agendaVue',
  data: {
    displayedSessions: null,
    sessions: null,
    speakers: null,
    agenda: null,
    favorites: [],
    typeFilters: ['keynote', 'conference', 'codelab', 'quickie'],
    curTypeFilters: [],
    trackFilters: ['web', 'cloud', 'mobile', 'discovery'],
    curTrackFilters: [],
    curFavoriteFilter: [],
    day1: false,
    day2: false
  },

  ready: function () {
    this.fetchData()
  },

  watch: {
    curTypeFilters: 'filter',
    curTrackFilters: 'filter',
    curFavoriteFilter: 'filter'
  },

  methods: {
    fetchData: function () {
      var self = this;
      fetch('assets/devfest.json').then(function(response) {
        return response.json();
      }).then(function(json) {
        self.sessions = json.sessions;
        self.displayedSessions = json.sessions;
        self.speakers = json.speakers;
        self.agenda = json.agenda;
      });

      self.favorites = JSON.parse(localStorage['fav']) || []
      //fetch('api/v1/stars/get?login=ben').then(function(response) {
      //  return response.json();
      //}).then(function(json) {
      //  self.favorites = json.favs;
      //});
    },
    getTypeColor: getTypeColor,
    getTrackColor: getTrackColor,
    filter: function() {
      var self = this;
      var result = this.sessions;
      if (this.curTypeFilters.length > 0) {
        result = result.filter(function(session) {
          return self.curTypeFilters.indexOf(session.type) !== -1
        })
      }
      if (this.curTrackFilters.length > 0) {
        result = result.filter(function(session) {
          return self.curTrackFilters.indexOf(session.track) !== -1
        })
      }
      if (this.curFavoriteFilter.length > 0) {
        result = result.filter(function(session) {
          return self.favorites.indexOf(session.id.toString()) !== -1
        })
      }
      this.displayedSessions = result;
    }
  },

  events: {
    'toggle-favorite': function(id, favorite) {
      toggleFavorite(id, favorite, this.favorites)
      this.filter()
    }
  }
});
