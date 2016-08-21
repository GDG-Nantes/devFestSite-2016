/* eslint-disable */
var agendaVue = new Vue({
  el: '#agendaVue',
  data: {
    sessions: null,
    speakers: null,
    agenda: null,
    favorites: []
  },

  created: function () {
    this.fetchData()
  },

  methods: {
    fetchData: function () {
      var self = this;
      fetch('assets/devfest.json').then(function(response) {
        return response.json();
      }).then(function(json) {
        self.sessions = json.sessions;
        self.speakers = json.speakers;
        self.agenda = json.agenda;
      });

      fetch('api/v1/stars/get?login=ben').then(function(response) {
        return response.json();
      }).then(function(json) {
        self.favorites = json.favs;
      });
    }
  },

  events: {
    'toggle-favorite': toggleFavorite
  }
});
