controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playPauseSelector: '#player_playpause',
  nextSelector: '#player_ffw',
  previousSelector: '#player_rew',
  artistSelector: '#episodes span.selected',
  watchedElements: ['body']
});

controller.override('isPlaying', function() {
  return this.querySelectorText('#player_playpause') == '[PAUSE]'
})

controller.override('getTitle', function() {
  return "Music for Programming"
})

controller.override('getAlbumArt', function() {
  return "http://musicforprogramming.net/img/folder.jpg"
})

controller.override('nextSong', function(_super) {
  if (this.querySelectorContainsClass('#player_stop', 'active'))
    _super()
  else {
    var nextEpisode = this.document.querySelector('#episodes span.selected ~ a')
    if (nextEpisode)
      nextEpisode.click()
    else
      this.document.querySelector('#episodes a:first-of-type').click()
  }
})

controller.override('previousSong', function(_super) {
  if (this.querySelectorContainsClass('#player_stop', 'active'))
    _super()
  else {
    var el = this.document.querySelector('#episodes span.selected')
    while (el && el.nodeName.toLowerCase() != 'a')
      el = el.previousSibling
    if (el)
      el.click()
    else
      this.document.querySelector('#episodes a:last-of-type').click()
  }
})
