controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
    thumbsUp: true,
    thumbsDown: true
  },
  playStateSelector: 'button[data-id=play-pause]',
  playStateClass: 'playing',
  playPauseSelector: 'button[data-id=play-pause]',
  nextSelector: 'button[data-id=forward]',
  previousSelector: 'button[data-id=rewind]',
  titleSelector: '#playerSongTitle',
  artistSelector: '#player-artist',
  artworkImageSelector: '#playingAlbumArt',
  thumbsUpSelector: "li[data-rating='5']",
  thumbsDownSelector: "li[data-rating='1']",
  isThumbsUpSelector: "li[data-rating='5'].selected",
  isThumbsDownSelector: "li[data-rating='1'].selected",
});

controller.override('getAlbumArt', function(_super) {
  var art = _super();
  return art && art.replace('s130', 's300');
})
