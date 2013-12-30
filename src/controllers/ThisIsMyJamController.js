function runOnPage() {
  var proxy = document.createElement('div');
  proxy.id = 'UnityProxyDiv';
  proxy.style.display = 'none';
  document.body.appendChild(proxy);
  proxy.addEventListener('UnitySendAction', function() {
    var f = proxy.getAttribute('data-send-action');
    if (f == 'pause') {
      player.pause();
    } else if (f == 'resume') {
      player.resume();
    } else if (f == 'next') {
      player.next();
    } else if (f == 'prev') {
      player.prev();
    }
  });
};

// Append and run the script.
var script = document.createElement('script');
script.innerHTML = runOnPage + "\nrunOnPage();";
document.body.appendChild(script);

controller = {
    init: function() {
        var controls = document.getElementById('controls');
        if (!controls) return false;
        setInterval(sendState, 1000);
        sendState();
        return true;
    },
    name: "This Is My Jam",
    sendEvent: function(action) {
        var proxy = document.getElementById('UnityProxyDiv');
        proxy.setAttribute('data-send-action', action);
        var evt = document.createEvent("Event");
        evt.initEvent("UnitySendAction", true, true );
        proxy.dispatchEvent(evt);
    },
    nextSong: function() {
      this.sendEvent('next');
    },
    previousSong: function() {
      this.sendEvent('prev');
    },
    play: function() {
      if (this.isPlaying())
        this.sendEvent('pause');
      else
        this.sendEvent('resume');
    },
    isPlaying: function() {
      return document.getElementById('playPause').classList.contains('playing');
    },
    supports: {
        next:true,
        previous:true,
        playpause:true
    },
    getState: function() {
        var state = {};
        state.title = document.getElementById('track-title').innerText;
        state.artist = document.getElementById('artist-name').innerText;
        state.playing = this.isPlaying();
        var artimg = document.querySelector('.playing img')
        if (artimg) {
          this.lastArt = artimg.src;
          state.albumArt = artimg.src;
        } else {
          state.albumArt = this.lastArt || undefined;
        }
        return state;
    }
}
