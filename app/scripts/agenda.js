/* eslint-disable */
var agendaVue = new Vue({
  el: '#agendaVue',
  data: {
    message: 'Hello Agenda!'
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      var self = this;
      fetch('assets/prog.json').then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json)
      });
    }
  }
});
