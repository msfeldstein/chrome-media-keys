controller = new BasicController({
  supports: {
    playpause: true
  },
  playPauseSelector: '.qa-pause-play-button',
  titleSelector: '.tw-mg-b-05',
  artistSelector: '.channel-header h5',
  artworkImageSelector: '.channel-header .tw-avatar__img',
  watchedElements: ['body'],

  isPlaying: function () {
    return document.querySelector('.qa-pause-play-button svg').id === "icon_pause";
  },

  dontScrobble: function () {
    return true;
  }
});
