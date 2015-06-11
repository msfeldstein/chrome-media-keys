controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  useLazyObserving: true,
  frameSelector: '#main',
  playStateSelector: '#play',
  playStateClass: 'playing',
  playPauseSelector: '#play',
  nextSelector: '#next',
  previousSelector: '#previous',
  titleSelector: '.caption .track',
  artistSelector: '.caption .artist'
});

controller.override('getAlbumArt', function() {
  return document.querySelector(this.frameSelector).contentDocument.querySelector('#large-cover-image').style.backgroundImage.slice(4, -1);
});
