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
      return '50 min';
    case 'repas':
      return '1h30';
    case 'conference':
      return '50 min';
    case 'codelab':
      return '2 h';
    case 'quickie':
      return '20 min';
    case 'after':
      return '30 min';
    case 'café':
      return '15 min';
    default:
      return '50 min';
  }
};

getRoomLabel = function getRoomLabel(id) {
  switch (id) {
    case 1:
      return language === 'en' ? 'Room Titan' : 'Salle Titan';
    case 2:
      return language === 'en' ? 'Room Belem' : 'Salle Belem';
    case 3:
      return language === 'en' ? 'Room Tour de Bretagne' : 'Salle Tour de Bretagne';
    case 4:
      return language === 'en' ? 'Room Graslin' : 'Salle Graslin';
    case 5:
      return language === 'en' ? 'Room Les Machines' : 'Salle Les machines';
    case 6:
      return language === 'en' ? 'Room Tour LU' : 'Salle Tour LU';
    case 7:
      return language === 'en' ? 'Room le Château' : 'Salle le Château';
    case 8:
      return 'Mezzanine & Hall'
    default:
      return 'Cité des congrès'
  }
}

// Get the day label
var getDayLabel = function getDayLabel(day) {
  return 'Vendredi 16 Mars'
  // switch (day) {
  //   case 2:
  //     return language === 'en' ? 'Thursday, November 10th' : 'Jeudi 10 novembre';
  //   case 1:
  //     return language === 'en' ? 'Wednesday, November 9th' : 'Mercredi 9 novembre';
  // }
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
      return language === 'en' ? 'Level beginner' : 'Niveau débutant'
    case 2:
      return language === 'en' ? 'Level intermediate' : 'Niveau intermédiaire'
    case 3:
      return language === 'en' ? 'Level advanced' : 'Niveau avancé'
    default:
      return language === 'en' ? 'Level beginner' : 'Niveau débutant'  
  }
};

// Get the language label
var getLangLabel = function getLangLabel(lang) {
  switch (lang) {
    case 'en':
      return language === 'en' ? 'English' : 'Anglais'
    default:
      return language === 'en' ? 'French' : 'Français'
  }
};

var getSpeakers = function getSpeakers(speakersId, speakers) {
  var label = '';
  for (var i = 0; i < speakersId.length; i++) {
    if (speakersId.length > 1 && i > 0 && i <= speakersId.length - 1) {
      label += ' & '
    }
    label += getSpeaker(speakersId[i], speakers);
  }
  return label;
}

var getSpeaker = function getSpeaker(id, speakers) {
  var speaker = speakers.filter(function(s) {
    return s.id === id
  })[0];
  return getSpeakerLabel(speaker)
}

var getSpeakerPhoto = function getSpeaker(id, speakers) {
  var speaker = speakers.filter(function(s) {
    return s.id === id
  })[0];
  return '/images/speakers/' + speaker.photo;
}

var getSpeakerLabel = function getSpeakerLabel(speaker) {
  var company = speaker.company !== null ? ' (' + speaker.company + ')' : ''
  return speaker.firstname + ' ' + speaker.name + company;
}

var getSessionByDayHour = function getSessionByDayHour(day, hour, sessions) {
  const s = sessions.filter(function(s) {
    return s.agenda && s.agenda.day === day && s.agenda.hour === hour
  });
  s.sort(function(a, b) {
    if (a.type === 'conference' && b.type !== 'conference') {
      return -1;
    } else if (a.type !== 'conference' && b.type === 'conference') {
      return 1;
    } else {
      return 0;
    }
  });
  return s;
}

// favorites
var isFavorite = function(id, favs) {
  if (favs) {
    return favs.indexOf(id.toString()) !== -1
  } else {
    return false
  }
}

var toggleFavorite = function (id, favorite, favorites, userLogged) {
  var index = favorites.indexOf(id.toString());
  if (index !== -1 && !favorite) {
    favorites.splice(index, 1);
  } else if (favorite) {
    favorites.push(id.toString());
  }
  if (userLogged) { // waiting user login
    fetch('/api/v1/stars/put?login=' + userLogged + '&favs=' + JSON.stringify(favorites)).then(function(response) {})
  } else {
    localStorage['fav'] = JSON.stringify(favorites)
  }
  return favorites;
}
