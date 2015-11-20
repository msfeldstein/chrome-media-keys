controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.playPause i',
  playStateClass: 'icon-pause',
  playPauseSelector: '.playPause i',
  nextSelector: '[ng-click="Audio.next()"]',
  previousSelector: '[ng-click="Audio.previous()"]',
  titleSelector: '.player__progress__title',
  artistSelector: '.player__progress__title',
  watchedElements: ['body']
});

controller.override('isPlaying', function() {
  console.log("Checking")
  return document.querySelector('.playPause i').classList.contains('icon-pause')
})
