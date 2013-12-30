controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.js-play',
  playStateClass: 'pause-icon',
  playPauseSelector: '.js-play',
  nextSelector: '.js-forward',
  previousSelector: '.js-rewind',
  titleSelector: '.js-track-name',
  artistSelector: '.js-artist-name'
});

controller.override('getAlbumArt', function(_super) {
  var artDiv = document.querySelector('.js-cover');
  if (!artDiv) return "";
  var bg = artDiv.style.backgroundImage;
  return bg && bg.substring(4, bg.indexOf(')'));
})