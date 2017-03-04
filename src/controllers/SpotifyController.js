const config = {
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

// New version of spotify
if (window.location.hostname === 'open.spotify.com') {
  delete config.playStateClass;
  config.playStateSelector = '.now-playing-bar .spoticon-play-32';
  config.playSelector = '.now-playing-bar .spoticon-play-32';
  config.pauseSelector = '.now-playing-bar .spoticon-pause-32';
  config.artworkImageSelector = '.now-playing-bar .cover-art-image';
  config.artistSelector = '.now-playing-bar [href^="/artist"]';
  config.titleSelector = '.now-playing-bar [href^="/album"]';
  config.nextSelector = '.now-playing-bar .spoticon-skip-forward-24';
  config.previousSelector = '.now-playing-bar .spoticon-skip-back-24';

  controller = new BasicController(config);

  controller.override('isPlaying', function () {
    return this.doc().querySelector('.now-playing-bar .spoticon-pause-32');
  })
} else {
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
}

controller.override('getAlbumArt', function () {
  const img = this.doc().querySelector(this.artworkImageSelector);
  return img && img.style.backgroundImage.slice(5, -2);
})
