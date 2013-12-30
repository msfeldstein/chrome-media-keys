controller = {
  init: function() {
    document.body.addEventListener('DOMSubtreeModified', sendState);
    return true;
  },
  name: "Soundtracker.fm",
  nextSong: function() {
    clickById('songSkip');
  },
  play: function() {
    clickById(this.isPlaying() ? 'jplayer_pause' : 'jplayer_play');
  },
  supports: {
    next:true,
    playpause:true,
  },
  isPlaying: function() {
    var pausebutton = document.getElementById('jplayer_pause');
    return pausebutton && pausebutton.style.display != 'none';
  },
  getAlbumArt: function() {
    var img = document.getElementById('songImg');
    return img && img.src;
  },
  getTitle: function() {
    return innerText('songTitle');
  },
  getArtist: function() {
    return innerText('songArtist');
  },
  getState: function() {
    var state = {};
    state.playing = this.isPlaying();
    state.albumArt = this.getAlbumArt();
    state.title = this.getTitle();
    state.artist = this.getArtist();
    return state;
  }
};
