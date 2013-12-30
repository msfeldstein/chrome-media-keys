controller = {
    init: function() {
        document.body.addEventListener("DOMSubtreeModified", sendState);
        return true;
    },
    name: "MOG",
    nextSong: function() {
        clickById('next');
    },
    previousSong: function() {
        clickById('previous');
    },
    play: function() {
        clickById('play');
    },
    supports: {
        next:true,
        previous:true,
        playpause:true
    },
    getPlayButton: function() {
      return document.getElementById('play');
    },
    isPlaying: function() {
      var playButton = this.getPlayButton();
      return playButton && playButton.classList.contains('pause');
    },
    getAlbumArt: function() {
      var img = document.querySelector('#album_cover img');
		  return img && img.src;
    },
    getTitle: function() {
      return querySelectorText('.track_name');
    },
    getArtist: function() {
      return querySelectorText('.artist_name');
    },
    getState: function() {
        var state = {};
        if (!this.getPlayButton()) return state;
        state.albumArt = this.getAlbumArt();
        state.playing = this.isPlaying();
        state.artist = this.getArtist();
        state.title = this.getTitle();
        return state;
    }
}
