controller = {
  init: function() {
    document.body.addEventListener('DOMSubtreeModified', sendState);
    return true;
  },
  name: "Get Work Done Music",
  nextSong: function() {
    fireEvent(document.querySelector('.controls .next'), 'click');
  },
  play: function() {
    fireEvent(document.querySelector('.big-player .sc-remote-link'), 'click');
  },
  supports: {
    next:true,
    playpause:true
  },
  isPlaying: function() {
    return document.querySelector('.big-player .sc-remote-link').classList.contains('playing');
  },
  getAlbumArt: function() {
    return "";
  },
  getTitle: function() {
    return querySelectorText('.sc-title')
  },
  getArtist: function() {
    return "";
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
