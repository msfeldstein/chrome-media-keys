controller = {
  init: function() {
    document.body.addEventListener('DOMSubtreeModified', sendState);
    return true;
  },
  name: "Pony.Fm",
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  play: function() {
    document.querySelector('.play').click();
  },
  nextSong: function() {
    document.querySelector('.next').click();
  },
  previousSong: function() {
    document.querySelector('.previous').click();
  },
  isPlaying: function() {
    var pausebutton = document.querySelector('.track-player .icon-pause');
    return pausebutton && pausebutton.classList != 'icon-pause ng-hide';
  },
  getAlbumArt: function() {
    return document.querySelector('.track-player .image img').getAttribute('src');
  },
  getTitle: function() {
    return document.querySelector('.track-player .song').innerText;
  },
  getArtist: function() {
    return document.querySelector('.track-player .artist').innerText;
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
