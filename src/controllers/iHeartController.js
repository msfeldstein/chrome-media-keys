controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playStateSelector: '.js-play',
  playStateClass: 'pause',
  playPauseSelector: '.js-play',
  nextSelector: '.js-next',
  titleSelector: '.js-track-name',
  artistSelector: '.js-artist-name'
});

controller.override('getTrackName', function() {
  var div = document.querySelector('.js-track-name') || document.querySelector('.js-station-name');
  return div.textContent;
});

controller.override('getAlbumArt', function(_super) {
  var art = document.querySelector('.js-song-art') || document.querySelector('.js-station-art');
  var bg = art.style.backgroundImage;
  var end = bg.indexOf("')");
  var start = 5;
  if (end == -1) {
    end = bg.indexOf(")");
    start = 4;
  }
  return bg && bg.substring(start, end);
})
