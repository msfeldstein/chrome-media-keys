controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.js-pod-play',
  playStateClass: 'dn',
  playPauseSelector: '.av-switch',

  watchedElements: ['body']
});

controller.override('getTitle', function() {
  return "Giant Bomb"
})
