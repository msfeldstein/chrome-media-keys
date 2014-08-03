controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '#player-features',
  playStateClass: 'tmn_playing',
  playPauseSelector: '#playbutton',
  nextSelector: '#nextbutton',
  previousSelector: '#previousbutton',
  titleSelector: '.track_name .title',
  artistSelector: '.track_name .artist'
});
