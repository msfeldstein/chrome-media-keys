controller = new BasicController({
  supports: {
    playpause: true,
    previous: true,
  },
  playStateSelector: '.video-js',
  playStateClass: 'vjs-playing',
  playPauseSelector: '.vjs-play-control',
  previousSelector: '.vjs-rewind-seconds',
  titleSelector: '.font-mscon500',
  dontScrobble: function() {
    return true;
  },
  watchedElements: ['body']
});
