var config = {
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  useLazyObserving: true,
  playStateClass: 'playing',
  nextSelector: '#next',
  previousSelector: '#previous'
}

if (document.querySelector('#app-player')) { // Old Player
  config.artworkImageSelector = '#cover-art .sp-image-img';
  config.frameSelector = '#app-player';
  config.playStateSelector = '#play-pause';
  config.playPauseSelector = '#play-pause';
  config.titleSelector = '#track-name';
  config.artistSelector = '#track-artist';
} else { // New Player
  config.artworkImageSelector = '#large-cover-image';
  config.frameSelector = '#main';
  config.playStateSelector = '#play';
  config.playPauseSelector = '#pause';
  config.titleSelector = '.caption .track';
  config.artistSelector = '.caption .artist';
}

controller = new BasicController(config);
controller.override('getAlbumArt', function() {
  var img = this.doc().querySelector(this.artworkImageSelector);
  return img && img.style.backgroundImage.slice(5, -2);
});