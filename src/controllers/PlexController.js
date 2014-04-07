controller = new BasicController({
  supports: {
    playpause: true,
    previous: true,
    next: true
  },
  playStateSelector: '.play-btn',
  playStateClass: 'hidden',
  playSelector: '.play-btn',
  pauseSelector: '.pause-btn',
  nextSelector: '.next-btn',
  previousSelector: '.previous-btn',
  titleSelector: '.track-title',
  artistSelector: '.artist-title',
  artworkImageSelector: '.playerBarArt',
  watchedElements: ['#plex']
});
document.body.addEventListener('DOMSubtreeModified', function() {
  sendState();
});

var sendStateDebounced = throttle(sendState, 2000);

var stateChangeObserver = new WebKitMutationObserver(function(mutations, observer) {
  sendStateDebounced();
  console.log("Changed")
  controller.init();
});

stateChangeObserver.observe(document.getElementById("plex"), {attributes: true, characterData: true, subtree:true});


