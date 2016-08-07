/* eslint-disable */
var speakersVue = new Vue({
  el: '#speakersVue',
  data: {
    filters: ['mobile', 'cloud', 'web', 'discovery'],
    activeFilters: [],
    speakers: null,
    displayedSpeakers: null
  },
  created: function () {
    this.fetchData()
  },
  watch: {
    activeFilters: 'filter'
  },
  methods: {

    fetchData: function () {
      var self = this;
      fetch('assets/prog.json').then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json)
        self.speakers = json.speakers;
        self.filter();
      });
    },

    filter: function () {
      var self = this;
      if (this.activeFilters.length > 0) {
        this.displayedSpeakers = this.speakers.filter(function(speaker) {
          return self.activeFilters.indexOf(speaker.category.class) !== -1;
        })
      } else {
        this.displayedSpeakers = this.speakers;
      }
    }
    
  }
});
