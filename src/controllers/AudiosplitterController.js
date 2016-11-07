controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.p-controls .as-icon-play',
  playStateClass: 'ng-hide',
  playSelector: '.p-controls .as-icon-play',
  pauseSelector: '.p-controls .as-icon-pause',
  nextSelector: '.p-controls .as-icon-forward',
  previousSelector: '.p-controls .as-icon-backward',
  titleSelector: '.p-info-display .p-title',
  artistSelector: '.p-info-display .p-artist'
});
