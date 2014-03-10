controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    thumbsUp: true,
    thumbsDown: true,
    favorite: true
  },
  playStateSelector: '#playPauseControl',
  playStateClass: 'icon-pause',
  playPauseSelector: '#playPauseControl',
  nextSelector: '#skipForwardControl',
  titleSelector: '#player-metadata-primary',
  artistSelector: '#player-metadata-secondary',
  artworkImageSelector: '#player-meta-packshot',
  thumbsUpSelector: '#thumb-up',
  thumbsDownSelector: '#thumb-down',
  isThumbsUpSelector: '#thumb-up.active',
  isThumbsDownSelector: '#thumb-down.active',
  favoriteSelector: '#player-favourite-star',
  isFavoriteSelector: '#player-favourite-star.icon-star'
});