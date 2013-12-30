controller = {
    init: function() {
        document.body.addEventListener("DOMSubtreeModified", sendState);
        return true;
    },
    nextSong: function() {
        clickById('playerNext');
    },
    play: function() {
        clickById('playerPlay');
    },
    name: "iHeartRadio",
    supports: {
      playpause:true
    },
    isPlaying: function() {
      var playbutton = document.getElementById("playerPlay");
      return playbutton && playbutton.classList.contains('pause');
    },
    thumbsUp: function() {
      fireEvent(document.querySelector('a.thumbsUp'), 'click');
    },
    thumbsDown: function() {
      fireEvent(document.querySelector('a.thumbsDown'), 'click');
    },
    getAlbumArt: function() {
      var img = document.querySelector('.songArt img') ||
                document.querySelector('.playerArt img');
      var src = img && img.src;
      return src && src.replace('w=54', 'w=300');
    },
    isLiveRadio: function() {
      return isVisible(document.querySelector('.liveStn'));
    },
    getState: function() {
      var state = {};
      state.albumArt = this.getAlbumArt();
      state.playing = this.isPlaying();
      state.artist = querySelectorText('#player .artist');
      state.title = querySelectorText('#player .title');
      if (this.isLiveRadio()) {
        this.supports = {
          playpause:true
        };
      } else {
        this.supports = {
          playpause: true,
          next: true
        }
      }
      return state;
    }
}
