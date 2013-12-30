controller = {
  init: function() {
    document.body.addEventListener('DOMSubtreeModified', sendState);
    return true;
  },
  name: "Shuffler.fm",
  nextSong: function() {
    var button = document.querySelector('.playercontrols .next');
    fireEvent(button, 'click');
  },
  previousSong: function() {
    var button = document.querySelector('.playercontrols .prev');
    fireEvent(button, 'click');
  },
  play: function() {
    clickById('play_pause');
  },
  favorite: function() {
    clickById('favorite');
  },
  supports: {
    next:true,
    previous:true,
    playpause:true,
    favorite: true,
  },
  isPlaying: function() {
    var playbutton = document.getElementById('play_pause');
    return playbutton && playbutton.classList.contains('pause');
  },
  getAlbumArt: function() {
    return "http://shuffler.fm/assets/site/logo-med.png";
  },
  getTitle: function() {
    return innerText('track');
  },
  getArtist: function() {
    return "";
  },
  getFavorite: function() {
    return document.getElementById('favorite').classList.contains('remove');
  },
  getState: function() {
    var state = {};
    state.playing = this.isPlaying();
    state.albumArt = this.getAlbumArt();
    state.title = this.getTitle();
    state.artist = this.getArtist();
    state.favorite = this.getFavorite();
    return state;
  }
};
