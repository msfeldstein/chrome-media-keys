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
  artistSelector: '.mini-player .grandparent-title-container .grandparent-title',
  titleSelector: '.mini-player .title-container .item-title',
  artworkImageSelector: '.mini-player .media-poster-container .media-poster',
  watchedElements: ['body']
});

controller.override("getAlbumArt", function() {
  var image = document.querySelector('.mini-player').querySelector('.media-poster');
  if (!image) return null;
  return image.getAttribute('data-image-url');
});
