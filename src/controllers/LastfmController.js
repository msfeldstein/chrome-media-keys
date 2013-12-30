controller = {
    init: function() {
      document.querySelector("#radioTrackMeta").addEventListener('DOMSubtreeModified', sendState);
      return true;
    },
    name: "Last.fm",
    sendStateSoon: function() {
      var title = this.getState().title;
      function keepChecking() {
        if (controller.getState().title != title) {
          sendState();
        } else {
          setTimeout(keepChecking, 300);
        }
      }
      setTimeout(keepChecking, 300);
    },
    nextSong: function() {
      clickById('radioControlSkip');
      this.sendStateSoon();
    },
    play: function() {
      if (this.isPlaying()) {
        clickById('radioControlPause');
      } else {
        clickById('radioControlPlay');
      }
      this.sendStateSoon();
    },
    isPlaying: function() {
      return webRadio && webRadio.classList.contains('playing');
    },
    favorite: function() {
      clickById('radioControlLove');
      this.sendStateSoon();
    },
    supports: {
        next:true,
        favorite: true,
        playpause:true
    },
    getState: function() {
        var state = {};
        state.artist = querySelectorText("#radioTrackMeta .artist");
        state.title = querySelectorText("#radioTrackMeta .track");
        var art =  document.querySelector('.metadataHeader img');
        state.albumArt = art && art.src;
        state.favorite = radioPlayer.classList.contains('loved');
        state.playing = this.isPlaying();
        return state;
    }
}
