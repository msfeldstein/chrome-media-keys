controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playStateSelector: '.player-controls .play',
  playStateClass: 'playing',
  playPauseSelector: '.player-controls .play',
  nextSelector: '.player-controls .icon-skip',
  titleSelector: '.player-info .player-song',
  artistSelector: '.player-info .player-artist',
  artworkImageSelector: '#player .player-art img'
});
