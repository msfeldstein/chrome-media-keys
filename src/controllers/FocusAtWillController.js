controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playStateSelector: '.playerControls .play',
  playStateClass: 'playing',
  playPauseSelector: '.playerControls .play',
  nextSelector: '.playerControls .next',
  titleSelector: '.trackDetail .track',
  artistSelector: '.trackDetail .artist'
});