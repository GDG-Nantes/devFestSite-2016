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

      var userid = localStorage['userid'];
      if (userid) {
        fetch('api/v1/stars/get?login=' + userid).then(function(response) {
          return response.json();
        }).then(function(json) {
          self.favorites = json.favs || [];
        });
      } else {
        self.favorites = JSON.parse(localStorage['fav']) || []
      }
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
      var userid = localStorage['userid'];
      toggleFavorite(id, favorite, this.favorites, userid)
      this.filter()
    }
  }
});
