controller = new BasicController([{
  test: () => !!document.querySelector('#mainContainer'),
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
  watchedElements: ['.albumArt'],
  isPlaying: () => document.querySelector(this.pauseSelector).style.display == 'block'
}, {
  test: () => !!document.querySelector('.Container'),
  supports: {
    playpause: true,
    next: true,
    prev: true,
    thumbsUp: true,
    thumbsDown: true
  },
  playStateSelector: '.PlayButton',
  playPauseSelector: '.PlayButton',
  previousSelector: '.ReplayButton',
  nextSelector: '.SkipButton',
  titleSelector: '.nowPlayingTopInfo__current__trackName',
  artistSelector: '.nowPlayingTopInfo__current__artistName',
  artworkImageSelector: '.nowPlayingTopInfo__artContainer__art',
  thumbsUpSelector: '.ThumbUpButton',
  thumbsDownSelector: '.ThumbDownButton',
  isThumbsUpSelector: '.ThumbUpButton--active',
  isThumbsDownSelector: '.ThumbDownButton--active',
  isPlaying: () => true,
}]);
