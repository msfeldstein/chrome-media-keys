controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playStateSelector: '.sidebar .play',
  playStateClass: 'pause',
  playPauseSelector: '.sidebar .play',
  nextSelector: '.sidebar .skip',

  artworkImageSelector: '.sidebar .logo'
});

controller.override('getTitle', function() {
  var title = document.querySelector('.sidebar .title a');
  if (title) {
    return title.innerHTML.split("<br>")[1]
  }
  return ""
})

controller.override('getArtist', function() {
  var title = document.querySelector('.sidebar .title a');
  if (title) {
    return title.innerHTML.split("<br>")[0]
  }
  return ""
})
