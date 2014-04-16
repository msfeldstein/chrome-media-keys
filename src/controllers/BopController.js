controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: 'body',
  playStateClass: 'song-playing',
  playSelector: '[data-player=play-pause]',
  pauseSelector: '[data-player=play-pause]',
  nextSelector: '[data-player=next]',
  previousSelector: '[data-player=previous]',
  titleSelector: '.info-progress .title',
  artistSelector: '.info-progress .artist',
  artworkImageSelector: '.artist-image'
});


controller.override('getAlbumArt', function(_super) {
  var artDiv = document.querySelector(this.artworkImageSelector);
  if (!artDiv) return "";
  var bg = artDiv.style.backgroundImage;
  return bg && bg.substring(4, bg.indexOf(')'));
})