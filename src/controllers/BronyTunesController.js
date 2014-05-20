controller = {
  init: function() {
    document.body.addEventListener('DOMSubtreeModified', sendState);
    return true;
  },
  name: "BronyTunes",
  supports: {
    playpause: true,
    next: true
  },
  play: function() {
    clickById('play_pause');
  },
  nextSong: function() {
    clickById('fast_forward');
  },
  isPlaying: function() {
    var pausebutton = document.getElementById('play_pause');
    return pausebutton && pausebutton.classList == 'playing';
  },
  getAlbumArt: function() {
    var url = document.querySelector('#artwork')
        .style.backgroundImage;
    return url.substring(4, url.lastIndexOf(')'));
  },
  getTitle: function() {
    return document.getElementById('song_name').innerText;
  },
  getArtist: function() {
    return document.getElementById('artist_and_album_names').innerText.split(' – ')[0];
  },
  getAlbum: function() {
    return document.getElementById('artist_and_album_names').innerText.split(' – ')[1];
  },
  getState: function() {
    var state = {};
    state.playing = this.isPlaying();
    state.albumArt = this.getAlbumArt();
    state.title = this.getTitle();
    state.artist = this.getArtist();
    state.album = this.getAlbum();
    return state;
  }
};