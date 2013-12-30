controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playSelector: '#player .player-play',
  pauseSelector: '#player .player-pause',
  nextSelector: '#player .player-skip',
  titleSelector: '.szi-title',
  artistSelector: '.szi-artist',
  playStateSelector: '.sz-player',
  playStateClass: 'sz-player-play-state-play',
  artworkImageSelector: '.player-state-display.player-state-display-song img'
});


var sendStateDebounced = throttle(sendState, 2000);

var stateChangeObserver = new WebKitMutationObserver(function(mutations, observer) {
  sendStateDebounced();
});

stateChangeObserver.observe(document.getElementById("player"), {attributes: true, characterData: true, subtree:true});

