// This script is injected into the page via a script tag,
// so it runs in YouTube's context and can interact with its player object.
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
  var playerObjUnity;
  
  function getLikeButton() {
    return document.getElementById('watch-like')
  }
  
  function getDislikeButton() {
    return document.getElementById('watch-dislike');
  }
  
  function getLikeContainer() {
    return document.getElementById('watch-like-dislike-buttons');
  }
  
  var doAction = {
    pause: function() {
      if (isPlaying()) {
        playerObjUnity.pauseVideo();
      } else {
        playerObjUnity.playVideo();
      }
    },
    thumbsUp: function() {
      fireEvent(getLikeButton(), 'click');
      sendState();
      setTimeout(sendState, 500);
    },
    thumbsDown: function() {
      fireEvent(getDislikeButton(), 'click');
      sendState();
      setTimeout(sendState, 500);
    },
    next: function() {
      var next = document.getElementsByClassName('yt-uix-button-icon-playlist-bar-next')[0];
      fireEvent(next, 'click');
    },
    previous: function() {
      var prev = document.getElementsByClassName('yt-uix-button-icon-playlist-bar-prev')[0];
      fireEvent(prev, 'click');
    }
  }

  function isPlaying() {
    return playerObjUnity.getPlayerState && playerObjUnity.getPlayerState() == 1;
  }

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }
  function getAlbumArt() {
    var urlVars = getUrlVars();
    var vidId = urlVars["v"];
    return "http://img.youtube.com/vi/"+vidId+"/0.jpg";
  }
  function getTitleText() {
    var div = document.getElementById('eow-title') ||
              document.querySelector('.channels-featured-video-details a') ||
              document.getElementById('builder-preview-title') ||
              document.querySelector('#watch-headline-title');
    return div && (div.innerText || div.textContent);
  }
  
  function getThumbsUp() {
    if (getLikeContainer()) 
      return getLikeContainer().classList.contains('liked');
    return false;
  }
  function getThumbsDown() {
    if (getLikeContainer())
      return getLikeContainer().classList.contains('unliked');
    return false;
  }
  function sendState() {
    var title, artist;
    var titletext = getTitleText();
    var hyphen = titletext.indexOf(' - ');
    if (hyphen > 0) {
      artist = titletext.substring(0, hyphen);
      title = titletext.substring(hyphen + 3);
    } else {
      title = titletext;
      artist = '';
    }
    var state = {
      playing: isPlaying(),
      artist: artist,
      title: title,
      service: 'Youtube',
      thumbsUp: getThumbsUp(),
      thumbsDown: getThumbsDown(),
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
    var nav = true;
    var playlistButton = document.querySelector('.yt-uix-button-icon-playlist-bar-next');
    if (!playlistButton) {
      nav = false;
    }
    var like = !!getLikeContainer();
    unity.setSupports({playpause:true, thumbsUp: like, thumbsDown: like, next: nav, previous: nav});
  }
  
  function checkForPlayer() {
    var embed = document.getElementsByTagName('embed')[0];
    if (!embed) {
      playerObjUnity = null;
      return;
    }
    if (embed == playerObjUnity){
      return;
    }
    playerObjUnity = embed;
    function addListener() {
      playerObjUnity.addEventListener("onStateChange", "window.unityOnStateChange");
      sendState();
    }
    setTimeout(addListener, 1000);
    if (getLikeContainer())
      getLikeContainer().addEventListener('DOMSubtreeModified', sendState);
    // Watch for when the artwork is loaded.
    var watchMoreBox = document.getElementById('watch-more-from-user');
    if (watchMoreBox) {
      watchMoreBox.addEventListener('DOMSubtreeModified', sendState);
      // Click the "more from user" button twice so it loads the artwork inside.
      var button = document.getElementById('watch-mfu-button');
      fireEvent(button, 'click');
      fireEvent(button, 'click');
    }
    sendState();
    checkSupports()
  }
  
  document.body.addEventListener('DOMSubtreeModified', checkForPlayer);
}

// Append and run the script.
var script = document.createElement('script');
script.innerHTML = runOnPage + "\nrunOnPage();";
document.body.appendChild(script);
