controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.audioplayer .controls',
  playStateClass: 'playing',
  playSelector: '.audioplayer .play',
  pauseSelector: '.audioplayer .pause',
  nextSelector: '.audioplayer .seek_ahead',
  previousSelector: '.audioplayer .seek_back',

  // These may seem reversed, but that's the way it is on the site.
  titleSelector: '.audioplayer .title',
  artistSelector: '.audioplayer .byline',

  artworkImageSelector: '.left_col img',
  dontScrobble: function() {
    return true;
  }
});
