controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
  },
  playStateSelector: '.player-play .x-btn',
  playStateClass: 'player-btn-pause',
  playPauseSelector: '.player-play .x-btn',
  nextSelector: '.player-next .x-btn',
  previousSelector: '.player-prev .x-btn',
  titleSelector: '.info-title span',
  artistSelector: '.info-album-artist span',
  artworkImageSelector: '.player-info-thumb',
  watchedElements: ['body'],
});

controller.override('getArtist', function() {
  var text = this.querySelectorText(this.artistSelector) || '';
  var parts = text.split(" - ");
  return parts && parts.length == 2 ? parts[1] : this.querySelectorText(this.artistSelector);
})
