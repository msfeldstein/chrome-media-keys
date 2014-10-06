controller = new BasicController({
  supports: {
    "playpause": "true",
    "next": "true",
    "previous": "true"
  },
  playStateSelector: '.mini-play-controls #mini-play',
  playStateClass: 'pause',
  artistSelector: "#player-artist-name",
  titleSelector: "#player-track-name",
  artworkImageSelector: "#track-art-current-img",
  nextSelector: ".mini-play-controls #mini-skip",
  previousSelector: ".mini-play-controls #mini-skip-back",
  playPauseSelector: "#playerPlayPauseButton"
});