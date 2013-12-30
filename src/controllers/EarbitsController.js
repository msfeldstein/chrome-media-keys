controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
    favorite: true
  },
  playPauseSelector: '.btn-playpause',
  previousSelector: '.btn-rewind',
  nextSelector: '.btn-skip',
  titleSelector: '.track-info-box .track-name',
  artistSelector: '.track-info-box .artist-name',
  artworkImageSelector: '.track-info .album-cover img',
  isFavoriteSelector: '#audio-controls .track-bookmarked',
  favoriteSelector: '#audio-controls .btn-like, #audio-controls .track-bookmarked',
  playStateSelector: '.btn-playpause',
  playStateClass: 'btn-pause',
});