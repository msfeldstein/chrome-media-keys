controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    thumbsUp: true,
    thumbsDown: true
  },
  playStateSelector: '.playButton',
  playSelector: '.playButton',
  pauseSelector: '.pauseButton',
  nextSelector: '.skipButton',
  titleSelector: '.playerBarSong',
  artistSelector: '.playerBarArtist',
  artworkImageSelector: '.playerBarArt',
  thumbsUpSelector: '.thumbUpButton',
  thumbsDownSelector: '.thumbDownButton',
  isThumbsUpSelector: '.thumbUpButton.indicator',
  isThumbsDownSelector: '.thumbDownButton.indicator',
  watchedElements: ['.albumArt']
});

controller.override('isPlaying', function() {
    return document.querySelector(this.pauseSelector).style.display == 'block';
});
