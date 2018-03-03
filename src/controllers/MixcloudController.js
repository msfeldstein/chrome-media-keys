const config = {
  supports: {
    playpause: true
  },
  playStateSelector: '.player-control',
  playStateClass: 'pause-state',
  playPauseSelector: '.player-control',
  titleSelector: '.player-cloudcast-title',
  artistSelector: '.player-cloudcast-author-link',
  artworkImageSelector: '.player-cloudcast-image img'
}

controller = new BasicController(config);