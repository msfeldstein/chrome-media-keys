controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playStateSelector: '.audiojs',
  playStateClass: 'playing',
  playPauseSelector: '.play-pause',
  nextSelector: '#nextbtn',

  titleSelector: '#tracktitle',
  artistSelector: '#tracka',

  artworkImageSelector: '#imga img'
});
