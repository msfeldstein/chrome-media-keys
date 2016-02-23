controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '[data-id=play-pause]',
  playStateClass: 'playing',
  playPauseSelector: '[data-id=play-pause]',
  nextSelector: '[data-id=forward]',
  previousSelector: '[data-id=rewind]',
  titleSelector: '#currently-playing-title',
  artistSelector: '#player-artist',
  artworkImageSelector: '#playerBarArt'
});

controller.override('init', function(_super) {
  if (document.querySelector(this.playStateSelector))
    return _super();
  else
    return false;
});

controller.override('getAlbumArt', function(_super) {
  var art = _super();
  return art && art.replace('s130', 's300');
});
