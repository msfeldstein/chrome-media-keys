controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
  },
  playStateSelector: '.player-play-pause',
  playStateClass: 'playing',
  playPauseSelector: '.player-play-pause',
  nextSelector: '.player-next',
  previousSelector: '.prevbutton',
  titleSelector: '.track-title',
  artistSelector: '.track-artist',
  artworkImageSelector: '.artist-tile.playing .artist-details img'
});

controller.override('getAlbumArt', function() {
  var div = document.querySelector(this.artworkImageSelector);
  return div && div.getAttribute('data-backup-src');
})