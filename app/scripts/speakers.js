/* eslint-disable */
var speakersVue = new Vue({
  el: '#speakersVue',
  data: {
    speakers: null
  },

  ready: function () {
    this.fetchData()
  },

  watch: {
    activeFilters: 'filter'
  },

  methods: {

    fetchData: function () {
      var self = this;
      fetch('assets/devfest.json').then(function(response) {
        return response.json();
      }).then(function(json) {
        self.speakers = json.speakers.sort(sortBySpeakerName);
      });
    }

  }
});

function sortBySpeakerName(a,b) {
 var nameA=a.firstname.toLowerCase();
 var nameB=b.firstname.toLowerCase();
  if (nameA < nameB)
     return -1;
  if (nameA > nameB)
    return 1;
  return 0;
}
