controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playSelector: '.play_track a',
  pauseSelector: '.pause_track a',
  nextSelector: '.play_next a',
  titleSelector: '.micro-player .gotocurrent',
  artworkImageSelector: '.micro-player .gotocurrent',
  playStateSelector: '.play_track',
  playStateClass: 'hidden',
});

controller.override('getAlbumArt', function(_super) {
  var art = document.querySelector(controller.artworkImageSelector);
  var bg = art.style.backgroundImage;
  var end = bg.indexOf("')");
  var start = bg.indexOf("://") + 3;
  if (end == -1) {
    end = bg.indexOf(")");
    start = 4;
  }
  return bg && bg.substring(start, end);
})
