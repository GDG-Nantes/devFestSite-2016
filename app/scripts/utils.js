/* eslint-disable */

// return URL parameters from URL
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

// check if start with http ou https
function isUrl(url) {
   return /^(f|ht)tps?:\/\//i.test(url);
}

// Get track class for the chip
var getTrackColor = function getTrackColor(track) {
  switch (track) {
    case 'web':
      return 'color-bg-web devfest-chip';
    case 'cloud':
      return 'color-bg-cloud devfest-chip';
    case 'mobile':
      return 'color-bg-mobile devfest-chip';
    case 'discovery':
      return 'color-bg-discovery devfest-chip';
    default:
      return 'color-bg-default devfest-chip';
  }
};

//  Get talk type class for the chip
var getTypeColor = function getTypeColor(type) {
  switch (type) {
    case 'conference':
      return 'color-bg-conference devfest-chip';
    case 'codelab':
      return 'color-bg-codelab devfest-chip';
    case 'quickie':
      return 'color-bg-quickie devfest-chip';
    default:
      return 'color-bg-default devfest-chip';
  }
};

// Get the time label following the talk type
var getTimeLabel = function getTimeLabel(type) {
  switch (type) {
    case 'keynote':
      return '40 min';
    case 'repas':
      return '40 min';
    case 'conference':
      return '40 min';
    case 'codelab':
      return '2 h';
    case 'quickie':
      return '20 min';
  }
};

// Get the day label
var getDayLabel = function getDayLabel(day) {
  switch (day) {
    case 1:
      return 'Jeudi 10 novembre';
    case 2:
      return 'Mercredi 9 novembre';
  }
};

// Get the hour label
var getHourLabel = function getHourLabel(day, hour, agenda) {
  switch (day) {
    case 1:
      return agenda.day1.filter(function(h) {
        return h.id === parseInt(hour);
      })[0].label;
    case 2:
    return agenda.day2.filter(function(h) {
      return h.id === parseInt(hour);
    })[0].label;
  }
};

// Get the difficulty label
var getDifficultyLabel = function getDifficultyLabel(difficulty) {
  switch (difficulty) {
    case 1:
      return 'débutant'
    case 2:
      return 'intermédiaire'
    default:
      return 'avancée'
  }
};

// Get the language label
var getLangLabel = function getLangLabel(lang) {
  switch (lang) {
    case 'en':
      return 'Anglais'
    default:
      return 'Français'
  }
};

var getSpeaker = function getSpeaker(id, speakers) {
  var speaker = speakers.filter(function(s) {
    return s.id === id
  })[0];
  return getSpeakerLabel(speaker)
}

var getSpeakerLabel = function getSpeakerLabel(speaker) {
  var company = speaker.company !== null ? ' (' + speaker.company + ')' : ''
  return speaker.firstname + ' ' + speaker.name + company;
}

var getSessionByDayHour = function getSessionByDayHour(day, hour, sessions) {
  return sessions.filter(function(s) {
    return s.agenda.day === day && s.agenda.hour === hour
  })
}
