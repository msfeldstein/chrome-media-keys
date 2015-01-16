function runOnPage() {
  function fireEvent(element,event, data){
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true );
    if (data) evt.data = data;
    return!element.dispatchEvent(evt);
  }

  // UnityObj.sendState sends 'playing', 'thumbsUp', 'thumbsDown', 'title', 'artist', 'albumArt', 'domainIcon'
  var UnityMusicShim = function() {
    var UnityObj = {};
    UnityObj.sendState = function(state) {
      var evt = document.createEvent("CustomEvent");
      evt.initEvent("UnityStateEvent", true, true );
      document.body.setAttribute('data-unity-state', JSON.stringify(state));
      document.body.dispatchEvent(evt, state);
    }

    document.body.addEventListener('UnityActionEvent', function(e) {
      var action = JSON.parse(document.body.getAttribute('data-unity-action'));
      if (UnityObj._callbackObject) UnityObj._callbackObject[action]();
    });

    UnityObj.addCallbackObject = function(cbObj) {
      UnityObj._callbackObject = cbObj;
    };
    UnityObj.setSupports = function(supports) {
      var evt = document.createEvent("CustomEvent");
      evt.initEvent("UnitySupportsEvent", true, true );
      document.body.setAttribute('data-unity-supports', JSON.stringify(supports));
      document.body.dispatchEvent(evt, supports);
    }
    return UnityObj;
  };

  // The player obj (flash object) used by unity.

  var doAction = {
    pause: function() {
      if (isPlaying()) {
        c.ap.play();
      } else {
        c.ap.pause();
      }
    },
    next: function() {
      c.ap.next();
    },
    previous: function() {
      c.ap.previous();
    }
  }

  function isPlaying() {
    return window.c.ap.audio && (window.c.ap.audio.paused || window.c.ap.audio.ended);
  }


  function getAlbumArt() {
    if (!window.c.ap.getItem()) return '';
    var img = _.where(window.c.dataSources.releases.models, {id: window.c.ap.getItem().model.attributes.albums[0].albumId})[0].attributes.coverArt;
    var labelName = _.where(window.c.dataSources.labels.models, {id: window.c.ap.getItem().model.attributes.label})[0].attributes.name;
    return 'https://' + window.location.host + '/img/labels/' + (labelName.toLowerCase()) + '/albums/' + img;
  }
  function getTitle() {
    return window.c.ap.getItem() ? window.c.ap.getItem().model.attributes.title : '';
  }
  function getArtist() {
    return window.c.ap.getItem() ? window.c.ap.getItem().model.attributes.artistsTitle : '';
  }
  function sendState() {
    var artist = getArtist();
    var title = getTitle();

    var state = {
      playing: isPlaying(),
      artist: artist,
      title: title,
      service: 'Monstercat Connect',
      albumArt: getAlbumArt()
    }
    unity.sendState(state);
  }

  window.unityOnStateChange = function(state) {
    checkSupports();
    sendState();
  }

  var unity = UnityMusicShim();
  unity.addCallbackObject(doAction);

  function checkSupports() {
    unity.setSupports({playpause:true, next: true, previous: true});
  }

  function checkForPlayer() {
    sendState();
    checkSupports()
  }

  document.body.addEventListener('DOMSubtreeModified', checkForPlayer);
  c.ap.on('paused', checkForPlayer);
  c.ap.on('play', checkForPlayer);
  c.ap.on('next', checkForPlayer);
  c.ap.on('previous', checkForPlayer);
}

// Append and run the script.
var script = document.createElement('script');
script.innerHTML = runOnPage + "\nrunOnPage();";
document.body.appendChild(script);
controller = {};
