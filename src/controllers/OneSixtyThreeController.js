controller = new BasicController({
  supports: {
    playpause: true,
    previous: true,
    next: true
  },
  playStateSelector: '[data-action="play"]',
  playStateClass: 'pas',
  playPauseSelector: '[data-action="play"]',
  previousSelector: '[data-action="prev"]',
  nextSelector: '[data-action="next"]',
  titleSelector: '.m-playbar .words .name',
  artistSelector: '.m-playbar .words .by',
  artworkImageSelector: '.m-playbar .head img'
});
