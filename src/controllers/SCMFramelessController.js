controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  useLazyObserving: true,
  playStateSelector: '#player',
  playSelector: '#player #play',
  pauseSelector: '#player #pause',
  nextSelector: '#player #next',
  previousSelector: '#player #previous',
  titleSelector: '#player #title',
});

controller.override('isPlaying', function() {
  return document.querySelector(this.playSelector).style.display == 'none';
});
