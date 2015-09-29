function shouldScrobble() {
  var shouldScrobble = localStorage.getItem('should_scrobble');
  return shouldScrobble && JSON.parse(shouldScrobble);
}

function setShouldScrobble(should) {
  localStorage.setItem('should_scrobble', should);
}

var scope = function() {
  var LastFMApiKey = '206a41dc006f9406b14b9b61daa8397e';
  var lastfm = new LastFM({
    apiKey: LastFMApiKey,
    apiSecret: 'ea0ccd20bee9b49872ea0b0547a9327c'
  });

  var token;
  var session = JSON.parse(localStorage.getItem("session"));
  var authCB;

  var checkSessionTimer = null;
  var checkSession = function() {
    var sessionCB = {
      success: function(resp) {
        session = resp.session;
        localStorage.setItem("session", JSON.stringify(session));
        if (authCB) authCB();
        chrome.tabs.onUpdated.removeListener(tabUpdated);
      },
      error: function(err) {
      }
    }
    lastfm.auth.getSession({token: token}, sessionCB);
  }

  var authTabId;
  var tabUpdated = function(tabId, changeInfo, tab) {
    if (tabId == authTabId) checkSession();
  };

  var sessionCallbacks = {
    success: function(resp) {
      session = resp.session;
      localStorage.setItem("session", session);
    },
    error: function(err) {
      var url = "http://www.last.fm/api/auth/?api_key=" + LastFMApiKey + "&token=" + token;
      chrome.tabs.create({
        url: url
      }, function(tab) {
        authTabId = tab.id;
        chrome.tabs.onUpdated.addListener(tabUpdated);
      });
    }
  }

  var tokenCallbacks = {
    success: function(resp) {
      token = resp.token;
      lastfm.auth.getSession({token: token}, sessionCallbacks);
    }
  }

  var scrobbleCallbacks = {
    error: function(err) {
      console.log("Scrobble Err", err);
    }
  }

  var scrobbler = {
    authenticate: function(callback) {
      authCB = callback;
      lastfm.auth.getToken(tokenCallbacks);
    },
    authenticated: function() {
      return !!session;
    },
    scrobble: function(artist, track) {
      if (track.indexOf('.mp3') != -1) track = track.substring(0, track.indexOf('.mp3'));
      lastfm.track.scrobble({
        artist: artist,
        track: track,
        timestamp: Math.floor(new Date().getTime() / 1000)
      }, session, scrobbleCallbacks);
    },
    updateNowPlaying: function(artist, track) {
      if (track.indexOf('.mp3') != -1) track = track.substring(0, track.indexOf('.mp3'));
      lastfm.track.updateNowPlaying({
        artist: artist,
        track: track,
        duration: 30,
        timestamp: Math.floor(new Date().getTime() / 1000)
      }, session, scrobbleCallbacks);
    }
  }
  window.scrobbler = scrobbler;

  var requestNewState = function() {
    sendAction('getState');
  }

  var currentTrackState = {};
  function updateScrobbleState(state) {
    if (!shouldScrobble() || state.dontScrobble) return;
    var updateNowPlaying = false;
    // If it's a new song set duration back to 0
    if (state.title && currentTrackState.title != state.title) {
      currentTrackState.duration = 0;
      currentTrackState.time = Date.now()
      currentTrackState.scrobbled = false;
      updateNowPlaying = true;
      setTimeout(requestNewState, 31000);
    }
    currentTrackState.title = state.title;
    currentTrackState.artist = state.artist;

    if (state.playing) {
      if (updateNowPlaying) {
        scrobbler.updateNowPlaying(state.artist, state.title);
      }
      // Only scrobble if it's been playing for 30 seconds.
      currentTrackState.duration += Date.now() - currentTrackState.time;
      if (currentTrackState.duration > (30 * 1000) && !currentTrackState.scrobbled) {
        currentTrackState.scrobbled = true;
        scrobbler.scrobble(currentTrackState.artist, currentTrackState.title);
      }
    }
    currentTrackState.playing = state.playing;
    currentTrackState.time = Date.now();
  }

  addStateListener(updateScrobbleState);
};
scope();
