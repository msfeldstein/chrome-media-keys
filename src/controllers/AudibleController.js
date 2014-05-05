controller = new BasicController({
  supports: {
    playpause: true,
    previous: true
  },
  playStateSelector: '.playback .play',
  playStateClass: 'hide',
  playPauseSelector: '.playback',
  previousSelector: '.main_ctrl .repeat',
  titleSelector: '.header .chapter',
  artistSelector: '#name-section span[itemprop="byArtist"]',
  artworkImageSelector: 'img.cover_img',
  watchedElements: ['.cnt']
});
