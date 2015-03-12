controller = new BasicController({
  supports: {
    playpause: true,
    previous: true,
    next: true,
  },
  playStateSelector: '#play-pause',
  playStateClass: 'playing',
  playPauseSelector: '#play-pause',
  previousSelector: '#play-prev',
  nextSelector: '#play-next',
  titleSelector: '.song.now-playing-link',
  artistSelector: '.artist.now-playing-link'
});
