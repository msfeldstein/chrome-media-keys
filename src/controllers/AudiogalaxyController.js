controller = {
    init: function() {
        document.body.addEventListener("DOMSubtreeModified", sendState);
        return true;
    },
    name: "Audiogalaxy",
    supports: {
      playpause:true,
      next: true,
      previous: true
    },
    nextSong: function() {
      clickById('nextSong');
    },
    previousSong: function() {
      clickById('prevSong');
    },
    play: function() {
      clickById('controlSong');
    },
    isPlaying: function() {
      return !!document.querySelector('#playerControls  .pauseSong')
    },
    thumbsUp: function() {
      fireEvent(document.querySelector('a.thumbsUp'), 'click');
    },
    thumbsDown: function() {
      fireEvent(document.querySelector('a.thumbsDown'), 'click');
    },
    getAlbumArt: function() {
      var img = document.querySelector('#currentSongArt img');
      return img.src;
    },
    getState: function() {
      var state = {};
      state.albumArt = this.getAlbumArt();
      state.playing = this.isPlaying();
      state.title = querySelectorText('#currentSongName');
      state.artist = querySelectorText('#currentArtistName');
      return state;
    }
}
