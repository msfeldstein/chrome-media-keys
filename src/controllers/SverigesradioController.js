controller = new BasicController({
  supports: {
    playpause: true
  },
  playStateSelector: '#play-control',
  playStateClass: 'stop-control',
  playPauseSelector: '#play-control',
  titleSelector: '.info-title',
  artistSelector: '.info-subtitle'
});
