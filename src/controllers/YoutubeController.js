controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: (!!document.querySelector('.ytp-prev-button')) ? (document.querySelector('.ytp-prev-button') && document.querySelector('.ytp-prev-button').style.display != 'none') : (document.querySelector('.ytp-button-prev') && document.querySelector('.ytp-button-prev').style.display != 'none'),
    thumbsUp: true,
    thumbsDown: true,
  },
  playStateSelector: '.ytp-play-button',
  playStateClass: 'playing-mode',
  titleSelector: '.watch-title',
  artistSelector: '.yt-user-info > a',
  isThumbsUpSelector: '.like-button-renderer-like-button-unclicked.hid',
  isThumbsDownSelector: '.like-button-renderer-dislike-button-unclicked.hid',
  watchedElements: ['body']
});

controller.override('isPlaying', function() {
  var button = document.querySelector('.ytp-play-button')
  return button && button.getAttribute('aria-label') == "Pause"
})

controller.override('getTitle', function() {
  var text = this.querySelectorText('.watch-title');
  var parts = text.split(" - ");
  return parts && parts.length == 2 ? parts[1] : text;
})

controller.override('getArtist', function() {
  var text = this.querySelectorText('.watch-title');
  var parts = text.split(" - ");
  return parts && parts.length == 2 ? parts[0] : this.querySelectorText(this.artistSelector);
})

controller.override('getAlbumArt', function() {
  function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
  }
  var vidId = getQueryParams(document.location.search).v;
  return "http://img.youtube.com/vi/" + vidId + "/0.jpg";
});

controller.override('play', function() {
  if (!!document.querySelector('.ytp-play-button')) {
    this.clickQS('.ytp-play-button');
  } else {
    if (this.isPlaying()) {
      this.clickQS('.ytp-button-pause');
    } else {
      this.clickQS('.ytp-button-play, .ytp-button-replay');
    }
  }
});

controller.override('nextSong', function() {
  if (!!document.querySelector('.ytp-next-button')) {
    this.clickQS('.ytp-next-button');
  } else {
    this.clickQS('.ytp-button-next');
  }
});

controller.override('previousSong', function() {
  if (!!document.querySelector('.ytp-prev-button')) {
    this.clickQS('.ytp-prev-button');
  } else {
    this.clickQS('.ytp-button-prev');
  }
});

controller.override('thumbsUp', function() {
  if (this.querySelectorContainsClass(".like-button-renderer-like-button-clicked", "hid")) {
    this.clickQS(".like-button-renderer-like-button-unclicked");
  } else {
    this.clickQS(".like-button-renderer-like-button-clicked");
  }
});

controller.override('thumbsDown', function() {
  if (this.querySelectorContainsClass(".like-button-renderer-dislike-button-clicked", "hid")) {
    this.clickQS(".like-button-renderer-dislike-button-unclicked");
  } else {
    this.clickQS(".like-button-renderer-dislike-button-clicked");
  }
});

controller.override('dontScrobble', function() {
  var text = this.querySelectorText('.watch-title');
  var parts = text.split(" - ");
  return parts.length != 2;
});
