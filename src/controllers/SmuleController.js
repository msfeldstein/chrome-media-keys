controller = new BasicController({
  supports: {
    playpause: true,
    previous: true,
    next: true
  },
  playPauseSelector: '.jp-play',
  pauseSelector: '.jp-pause',
  previousSelector: '.jp-controls .prev',
  nextSelector: '.jp-controls .next',
  titleSelector: '.player-title .song-title',
  artistSelector: '.player-title .artist',
  artworkImageSelector: '.profile-image img',
  watchedElements: ['.fixed-panel']
});

controller.override("isPlaying", function() {
  var pause = document.querySelector('.jp-pause');
  return pause && pause.style.display != "none";
});

controller.override("getTitle", function() {
  return "Playing on Smule";
})