controller = {
  init: function() {
    document.body.addEventListener('DOMSubtreeModified', sendState);
    return true;
  },
  supports: {
    playpause: true,
    thumbsUp: true
  },
  play: function() {
    if (document.querySelector('.jp-mute').style.display != 'none' ) {
      document.querySelector('.media.station.playing .jp-mute').click();
    } else {
      document.querySelector('.media.station.playing .jp-unmute').click();
    }
  },
  isPlaying: function() {
    if (document.querySelector('.jp-mute').style.display != 'none' ) {
      return true;
    } else {
      return false;
    }
  },
  getAlbumArt: function() {
    if (document.querySelector('.media.station.playing') != undefined) {
      return document.querySelector('.media.station.playing .station-image').getAttribute('src');
    } else {
      return "";
    }
  },
  getTitle: function() {
    if (document.querySelector('.media.station.playing') != undefined) {
      return document.querySelector('.media.station.playing .nowplaying-artist').innerText;
    } else {
      return "";
    }
  },
  getArtist: function() {
    if (document.querySelector('.media.station.playing') != undefined) {
      return document.querySelector('.media.station.playing .nowplaying-title').innerText;
    } else {
      return "";
    }
  },
  thumbsUp: function() {
    if (document.querySelector('.media.station.playing') != undefined) {
      return document.querySelector('.media.station.playing .btn-like').click();
    } else {
      return "";
    }
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