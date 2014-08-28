controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.jp-play',
  playSelector: '.jp-play',
  pauseSelector: '.jp-pause',
  nextSelector: '.jp-next',
  previousSelector: '.jp-back',
  titleSelector: '.title',
  artistSelector: '.slug'
});

controller.override('isPlaying', function() {
    return document.querySelector(this.pauseSelector).style.display == 'block';
});