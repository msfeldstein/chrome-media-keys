controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playPauseSelector: '#player_playpause',
  nextSelector: '#player_ffw',
  previousSelector: '#player_rew',
  artistSelector: '#episodes span.selected',
  watchedElements: ['body']
});

controller.override('isPlaying', function() {
  return this.querySelectorText('#player_playpause') == '[PAUSE]'
})

controller.override('getTitle', function() {
  return "Music for Programming"
})