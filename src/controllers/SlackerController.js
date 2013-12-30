controller = new BasicController({
  supports: {
    "playpause": "true",
    "next": "true"
  },
  playStateSelector: '.mini-play-controls #mini-play',
  playStateClass: 'pause',
  artistSelector: "#player-artist-name",
  titleSelector: "#player-track-name",
  artworkImageSelector: "#track-art-current-img",
  nextSelector: "#playerSkipButton",
  playPauseSelector: "#playerPlayPauseButton"
});