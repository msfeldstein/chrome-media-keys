document.body.addEventListener('DOMSubtreeModified', throttle(sendState, 250));

controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
    favorite: true
  },
  playPauseSelector: '.player-play-button *',
  previousSelector: '.player-rewind-button',
  nextSelector: '.player-advance-button',
  titleSelector: '.player-info-row .player-track',
  artistSelector: '.player-info-row .player-artist',
  artworkImageSelector: '.player-album-thumbnail img',
  isFavoriteSelector: '.favorite-button.active',
  favoriteSelector: '.favorite-button',
  playStateSelector: '.player-play-button',
  watchedElements: ['.player-info-row']
});

controller.override('isPlaying', function() {
    return !!document.querySelector('.player-play-button .icon-pause');
});