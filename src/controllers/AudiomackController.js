controller = new BasicController({
  supports: {
    playpause: true,
    previous: true,
    next: true
  },
  playStateSelector: '#play-button',
  playStateClass: 'glyphicon-pause',
  playPauseSelector: '#play-button',
  previousSelector: '.prev-track',
  nextSelector: '.next-track',
  titleSelector: '.player-title .song-title',
  artistSelector: '.player-title .artist',
  artworkImageSelector: '.profile-image img'
});
