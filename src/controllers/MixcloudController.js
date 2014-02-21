controller = new BasicController({
  supports: {
    playpause: true,
  },
  playStateSelector: '.player-control',
  playStateClass: 'pause-state',
  playPauseSelector: '.player-control',
  titleSelector: '.player-cloudcast-title',
  artistSelector: '.player-cloudcast-author-link',
  artworkImageSelector: '.player-cloudcast-image img',
});

controller.override('getAlbumArt', function(_super) {
  var art = _super();
  return art && art.replace(/\/60\//g, '\/300\/');
})
