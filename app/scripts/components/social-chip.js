/* eslint-disable */
const socialChipTemplate =
'<span class={{this.getSocialClass(type)}}>'
+ '{{{ this.getSocialContent(type, value) }}}'
+ '</span>'

var SocialChip = Vue.extend({
  props: {
    type: String,
    value: String
  },
  template: socialChipTemplate,
  methods: {
    getSocialClass : function getSocialClass(type) {
      switch (type) {
        case ('twitter'):
          return "devfest-chip color-bg-twitter";
        case ('googleplus'):
          return "devfest-chip color-bg-googleplus";
        case ('github'):
          return "devfest-chip color-bg-github";
      }
    },
    getSocialContent : function getSocialContent(type, value) {
      switch (type) {
        case ('twitter'):
          return '<a href="' + checkLink(type, value) + '" target="_NEW">Twitter</a>';
        case ('googleplus'):
          return '<a href="' + checkLink(type, value) + '" target="_NEW">G+</a>';
        case ('github'):
          return '<a href="' + checkLink(type, value) + '" target="_NEW">GitHub</a>';
      }
    }
  }
})

function checkLink(type, value) {
 if (value && isUrl(value)) {
   return value;
 }
 if (value) {
   switch (type) {
      case ('twitter'):
        return value.indexOf('@') >= 0 ? 'https://twitter.com/' + value.replace('@', '') : 'https://twitter.com/' + value;
      case ('googleplus'):
        return value.indexOf('+') >= 0 ? 'https://plus.google.com/u/0/+' + value.replace('+', '') : 'https://plus.google.com/u/0/+' + value;
      case ('github'):
        return 'https://github.com/' + value;
      default:
        return '<a href="' + value + '" target="_NEW">'+ value + '</a>';
    }
  }
}

Vue.component('social-chip', SocialChip)
