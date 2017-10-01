console.log('PocketCasts Web 2.0 BETA');

controller = new BasicController({
  useLazyObserving: true,
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  watchedElements: ['.player-controls'],
  playPauseSelector: '.animated-play-button',
  nextSelector: '.skip-forward-button',
  previousSelector: '.skip-back-button',
  titleSelector: '.episode-title',
  artistSelector: '.podcast-title',
  artworkImageSelector: '.controls .podcast-image img',
  isPlaying: function() {
    return document.querySelector('.audio').autoplay;
  }
});
