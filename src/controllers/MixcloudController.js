controller = {
  init: function() {
    document.body.addEventListener('DOMSubtreeModified', sendState);
    return true;
  },
  name: "Mixcloud",
  nextSong: function() {
    clickById('jump-forward-button');
  },
  previousSong: function() {
    clickById('jump-backward-button');
  },
  play: function() {
    clickById('player-play');
  },
  supports: {
    next:true,
    previous:true,
    playpause:true
  },
  isPlaying: function() {
    var playbutton = document.getElementById('player-play');
    return playbutton && playbutton.classList.contains('playing');
  },
  getAlbumArt: function() {
    var img = document.getElementById('cloudcast-image');
    return img && img.src;
  },
  getTitle: function() {
    return querySelectorText('.now-playing-track-info .js-title');
  },
  getArtist: function() {
    return querySelectorText('.now-playing-track-info .js-artist');
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
