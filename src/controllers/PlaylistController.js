controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    thumbsUp: true,
    thumbsDown: true
  },
  playStateSelector: '[ng-controller="PlayerCtrl"]',
  playStateClass: 'playing-true',
  playPauseSelector: '.mejs-play',
  nextSelector: '.mejs-skip',
  titleSelector: '.ng-binding.track-title',
  artistSelector: '.ng-binding.track-artist',
  thumbsUpSelector: '.mejs-like',
  isThumbsUpSelector: '.mejs-like .active',
  thumbsDownSelector: '.mejs-dislike',
  isThumbsDownSelector: '.mejs-dislike .active',
  artworkImageSelector: '.album_art_list .album_art:last-child'
});
