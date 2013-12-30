function setupPodium() {
  Podium = {};
  Podium.keydown = function(k, shiftDown) {
      var oEvent = document.createEvent('KeyboardEvent');

      // Chromium Hack
      Object.defineProperty(oEvent, 'keyCode', {
                  get : function() {
                      return this.keyCodeVal;
                  }
      });     
      Object.defineProperty(oEvent, 'which', {
                  get : function() {
                      return this.keyCodeVal;
                  }
      });

      if (oEvent.initKeyboardEvent) {
          oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, 0, false, shiftDown, false, k, k);
      } else {
          oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, shiftDown, false, k, false);
      }

      oEvent.keyCodeVal = k;

      if (oEvent.keyCode !== k) {
          alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
      }

      document.body.dispatchEvent(oEvent);
  }
}

function pressKeyOnPage(k, shiftDown) {
  Podium.keydown(k, shiftDown);
  var script = document.getElementById('UnityKeyPressScript');
  script.parentNode.removeChild(script);
}



controller = {
  init: function() {
    this.lastArtwork = "";
    document.body.addEventListener('DOMSubtreeModified', sendState);
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.innerHTML = setupPodium + ";\nsetupPodium();";
    document.body.appendChild(e);
    return true;
  },
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  sendKeyDownEvent: function(k, shiftDown) {
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.innerHTML = pressKeyOnPage + ";\npressKeyOnPage("+k+", "+shiftDown+")";
    e.id = "UnityKeyPressScript";
    document.body.appendChild(e);

  },
  nextSong: function() {
    this.sendKeyDownEvent(39, true);
  },
  previousSong: function() {
    this.sendKeyDownEvent(37, true);
  },
  favorite: function() {
    this.sendKeyDownEvent(76, false);
  },
  play: function() {
    this.sendKeyDownEvent(32, true);
  },
  isPlaying: function() {
    var playingDiv = document.querySelector('.playControl');
    return playingDiv && playingDiv.classList.contains('playing');
  },
  getTitle: function() {
    return querySelectorText('.header .playbackTitle');
  },
  getAlbumArt: function() {
    var imageTag = document.querySelector(".sound.playing .image__full") || document.querySelector(".listen-about .image__full");
    if(imageTag) this.lastArtwork = imageTag.src;
    return this.lastArtwork;
  },
  getState: function() {
    var state = {};
    state.playing = this.isPlaying();
    state.title = this.getTitle();
    state.artist = "";
    state.albumArt = this.getAlbumArt();
    return state;
  }
}