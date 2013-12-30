controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.playbutton',
  playStateClass: 'playing',
  playPauseSelector: '.playbutton',
  nextSelector: '.nextbutton',
  previousSelector: '.prevbutton',
  titleSelector: '.track_info .title',
  artistSelector: '#name-section span[itemprop="byArtist"]',
  artworkImageSelector: '.popupImage img'
});
