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
document.body.addEventListener('DOMSubtreeModified', throttle(sendState));
controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playPauseSelector: '.player-play-button div',
  nextSelector: '.icon-next',
  previousSelector: '.icon-previous',
  titleSelector: '.player-track',
  artistSelector: '.player-artist',
  watchedElements: ['#player-pause', '#player-info']
});

controller.override('isPlaying', function() {
  var button = document.querySelector('.player-play-button .icon-pause');
  return !!button;
});

controller.override('getAlbumArt', function(_super) {
  var container = document.querySelector(".player-album-thumbnail");
  if (!container) return null;
  return container.querySelector('img') && container.querySelector('img').src;
})
