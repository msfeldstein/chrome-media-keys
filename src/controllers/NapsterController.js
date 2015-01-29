document.body.addEventListener('DOMSubtreeModified', throttle(sendState));
controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playSelector: '#player-play',
  pauseSelector: '#player-pause',
  nextSelector: '#player-next',
  previousSelector: '#player-previous',
  titleSelector: '#player-track',
  artistSelector: '#player-artist',
  watchedElements: ['#player-pause', '#player-info']
});

controller.override('isPlaying', function() {
  var button = document.querySelector('#player-pause');
  return button && button.style.display == "block"
});

controller.override('getAlbumArt', function(_super) {
  var containers = document.querySelectorAll(".player-album-thumbnail");
  for (var i = 0; i < containers.length; i++) {
    var container = containers[i];
    if (container.style.opacity > 0.2) {
      return container.querySelector('img').src;
    }
  }
  return containers[0].querySelector('img') && containers[0].querySelector('img').src;
})
