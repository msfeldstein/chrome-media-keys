throttle = function(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

document.body.addEventListener('DOMSubtreeModified', throttle(sendState, 250));

controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
    favorite: true
  },
  playPauseSelector: '.player-play-button *',
  previousSelector: '.player-rewind-button',
  nextSelector: '.player-advance-button',
  titleSelector: '.player-info-row .player-track',
  artistSelector: '.player-info-row .player-artist',
  artworkImageSelector: '.player-album-thumbnail img',
  isFavoriteSelector: '.favorite-button.active',
  favoriteSelector: '.favorite-button',
  playStateSelector: '.player-play-button',
  watchedElements: ['.player-info-row']
});

controller.override('isPlaying', function() {
    return !!document.querySelector('.player-play-button .icon-pause');
});
