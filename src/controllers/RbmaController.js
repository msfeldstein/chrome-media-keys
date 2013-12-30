controller = {
  init: function() {
    document.body.addEventListener('DOMSubtreeModified', sendState);
    return true;
  },
  name: "Red Bull Music Academy",
  nextSong: function() {
    clickById('bb_skip');
  },
  play: function() {
    clickById('bb_pp');
  },
  supports: {
    next:true,
    playpause:true
  },
  isPlaying: function() {
    return document.querySelector('#bb_pp').classList.contains('is-playing');
  },
  getAlbumArt: function() {
    var img = document.querySelector('#main .h-detail img');
    if (img) this.albumArt = img.src;
    return this.albumArt;
  },
  getTitle: function() {
    return querySelectorText('.player-info .title')
  },
  getArtist: function() {
    return querySelectorText('.player-info .show-title');
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
