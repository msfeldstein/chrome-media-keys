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
      if (this.isLiveRadio()) {
        var div = document.querySelector('.playerStn');
        if (!div) return "";
        var cssImg = div.style.backgroundImage;
        return cssImg.substring(4, cssImg.length - 1);
      } else {
        return document.querySelector('.songArt img').src;
      }
    },
    getState: function() {
      var state = {};
      state.albumArt = this.getAlbumArt();
      state.playing = this.isPlaying();
      
      return state;
    }
}
