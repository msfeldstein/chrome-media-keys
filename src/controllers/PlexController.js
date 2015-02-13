controller = new BasicController({
  doThrottling: true,
  supports: {
    playpause: true,
    previous: true,
    next: true
  },
  playStateSelector: '.mini-player .play-btn',
  playStateClass: 'hidden',
  playSelector: '.mini-player .play-btn',
  pauseSelector: '.mini-player .pause-btn',
  nextSelector: '.mini-player .next-btn',
  previousSelector: '.mini-player .previous-btn',
  titleSelector: '.mini-player .item-title',
  artistSelector: '.mini-player .grandparent-title',
  artworkImageSelector: '.mini-player .playerBarArt',
  watchedElements: ['#plex']
});

controller.override("getAlbumArt", function() {
  var image = document.querySelector(".mini-player .media-poster");
  if (!image) return null;
  var url = image.style.backgroundImage;
  return url.substring(4, url.length - 1);
});
var sendStateDebounced = throttle(sendState, 2000);
document.body.addEventListener('DOMSubtreeModified', function() {
  sendStateDebounced();
});

