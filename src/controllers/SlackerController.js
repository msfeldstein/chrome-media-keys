controller = new BasicController({
  supports: {
    "playpause": "true",
    "next": "true",
    "previous": "true"
  },
  playStateSelector: '.playpause',
  playStateClass: 'play',
  artistSelector: "#bar .metadata span:first-child",
  titleSelector: "#bar .metadata span:nth-child(3)",
  artworkImageSelector: "#bar .art img",
  nextSelector: ".skip-forward a",
  previousSelector: ".skip-back a",
  playPauseSelector: ".playpause a"
});