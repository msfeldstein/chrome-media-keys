controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '[data-bind*=togglePause]',
  playStateClass: 'iconPlayerPause',
  playPauseSelector: '[data-bind*=togglePause]',
  nextSelector: '[data-bind*=next]',
  previousSelector: '[data-bind*=previous]',
  titleSelector: '[data-bind*=primaryArtist\\.Name]',
  artistSelector: '[data-bind*=parentAlbum\\.Name]',
});


controller.override('getAlbumArt', function(_super) {
  var art = document.querySelector('.playerNowPlayingImg .imgWrapper .img').src;
  return art && art.replace('w=160', 'w=300').replace('h=160', 'h=300');
})
