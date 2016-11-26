controller = new BasicController({
  useLazyObserving: true,
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playSelector: '.player-controls .svg-icon-play',
  pauseSelector: '.player-controls .svg-icon-pause',
  nextSelector: '.player-controls .control-next',
  previousSelector: '.player-controls .control-prev',
  titleSelector: '.player-track .player-track-title a',
  artistSelector: '.player-track .player-track-artist a',
  artworkImageSelector: '.player-cover img',
  watchedElements: ['.player-controls .control-play']
});

controller.override('isPlaying', function() {
  return !!document.querySelector('.player-controls .svg-icon-pause');
});
