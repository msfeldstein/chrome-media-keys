controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '#play',
  playStateClass: 'hide',
  playSelector: '#play',
  pauseSelector: '#pause',
  nextSelector: '#fwd',
  previousSelector: '#rew',
  titleSelector: '#player-track-name',
  artistSelector: '#player-album-name',
});

controller.override('getAlbumArt', function(_super) {
  var artDiv = document.querySelector('#now-playing .key-art');
  if (!artDiv) return "";
  var bg = artDiv.style.backgroundImage;
  return bg && bg.substring(4, bg.indexOf(')'));
})