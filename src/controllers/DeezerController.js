controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playSelector: '.player-controls .icon-play',
  pauseSelector: '.player-controls .icon-pause',
  nextSelector: '.player-controls .control-next',
  previousSelector: '.player-controls .control-prev',
  titleSelector: '.player-track-title',
  artistSelector: '.player-track-artist .player-track-link',
  artworkImageSelector: '.player-cover img',
  watchedElements: ['.player-controls .icon-play']
});
var init = function() {
  controller.init()
}
setTimeout(init, 1000)
controller.override('isPlaying', function() {
  return !!document.querySelector('.player-controls .control-pause');
});