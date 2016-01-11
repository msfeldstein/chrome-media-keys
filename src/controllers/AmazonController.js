controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
    thumbsUp: true,
    thumbsDown: true,
  },
  playStateSelector: '.playButton',
  playStateClass: 'playerIconPause',
  playPauseSelector: '.playButton',
  titleSelector: '.trackTitleSelector',
  artistSelector: '.trackArtist',
  artworkImageSelector: '.albumArtWrapper img',
  nextSelector: '.nextButton',
  previousSelector: '.previousButton',
  watchedElements: ['body']
});
