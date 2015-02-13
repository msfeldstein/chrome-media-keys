controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playSelector: '.jp-play',
  pauseSelector: '.jp-pause',
  nextSelector: '.control.fast-forward',
  previousSelector: '.control.fast-backward',
  titleSelector: '.current-episode-link',
  artistSelector: '.current-series-link',
  artworkImageSelector: '.miniplayer .thumb img'
});

controller.override('isPlaying', function() {
  var button = document.querySelector('.jp-pause');
  return button && button.style.display == "inline-block"
});