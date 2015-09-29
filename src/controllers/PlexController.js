controller = new BasicController({
  doThrottling: true,
  supports: {
    playpause: true,
    previous: true,
    next: true
  },
  playStateSelector: '.play-btn',
  playStateClass: 'hidden',
  playSelector: '.play-btn',
  pauseSelector: '.pause-btn',
  nextSelector: '.next-btn',
  previousSelector: '.previous-btn',
  titleSelector: '.video-title',
  artworkImageSelector: '.mini-player .playerBarArt',
  watchedElements: ['body']
});

controller.override("getAlbumArt", function() {
  var image = document.querySelector(".media-poster");
  if (!image) return null;
  var url = image.style.backgroundImage;
  return url.substring(4, url.length - 1);
});
