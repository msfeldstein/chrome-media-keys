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
  isPlaying: function () {
    return document.querySelector(this.pauseSelector).style.display == 'block';
  }
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
  useLazyObserving: true,
  isPlaying: function () {
    let icon = document.querySelector(`${this.playStateSelector}>svg>use`);

    if (icon) {
      return icon.getAttribute('xlink:href').indexOf('#ic_pause') === 0;
    }
    
    return false;
  },
  getAlbumArt: function () {
    const imageHolder = document.querySelector(this.artworkImageSelector);
    
    const backgroundImage = imageHolder ? window.getComputedStyle(imageHolder).getPropertyValue('background-image') : '';
    
    return backgroundImage.replace(/^url\(['"]?([^'"\)]*)['"]?\).*$/, '$1');
  }
}]);
