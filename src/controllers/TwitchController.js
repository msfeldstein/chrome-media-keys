controller = new BasicController({
  supports: {
    playpause: true
  },
  playPauseSelector: '.qa-pause-play-button',
  titleSelector: '.qa-stream-title',
  artistSelector: '.qa-display-name',
  artworkImageSelector: '.qa-broadcaster-logo',
  watchedElements: ['body'],

  isPlaying: function () {
    return document.querySelector('.qa-pause-play-button svg use').getAttribute('xlink:href') === "#icon_pause";
  },

  dontScrobble: function () {
    return true;
  }
});
