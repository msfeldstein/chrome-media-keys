controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.playPause',
  playStateClass: 'pause',
  playPauseSelector: '.playPause',
  nextSelector: '.next',
  previousSelector: '.previous',
  titleSelector: '.song-title1',
  artistSelector: '.song-title1',
  artworkImageSelector: '.playersongimg img'
});
