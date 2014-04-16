controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playPauseSelector: '.miniplayer-control-play-pause',
  nextSelector: '.miniplayer-control-skip',
  titleSelector: '.miniplayer-info-track-title',
  artistSelector: '.miniplayer-info-artist-name',
  playStateSelector: '.player-state-song',
  playStateClass: 'player-state-play',
  artworkImageSelector: '.miniplayer-album-art'
});


var sendStateDebounced = throttle(sendState, 2000);

var stateChangeObserver = new WebKitMutationObserver(function(mutations, observer) {
  sendStateDebounced();
});

stateChangeObserver.observe(document.getElementById("player"), {attributes: true, characterData: true, subtree:true});

