controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  useLazyObserving: true,
  frameSelector: '#main, #app-player',
  playStateSelector: '#play, #play-pause',
  playStateClass: 'playing',
  playPauseSelector: '#play, #play-pause',
  nextSelector: '#next',
  previousSelector: '#previous',
  titleSelector: '.caption .track, #track-name',
  artistSelector: '.caption .artist, #track-artist'
});

controller.override('getAlbumArt', function() {
  return document.querySelector(this.frameSelector).contentDocument.querySelector('#large-cover-image, #cover-art .sp-image-img').style.backgroundImage.slice(4, -1);
});
