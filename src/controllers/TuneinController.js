controller = new BasicController({
  supports: {
    playpause: true
  },
  playStateSelector: '#tuner',
  playStateClass: 'playing',
  playPauseSelector: '.playbutton-cont.col',
  titleSelector: '.line1._navigateNowPlaying',
  artistSelector: '.line2._navigateNowPlaying .title',
  artworkImageSelector: 'img.logo.loaded'
});
