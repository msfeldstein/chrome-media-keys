controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playSelector: '.player-nav.play',
  pauseSelector: '.player-nav.play',
  previousSelector: '.player-nav.prev',
  nextSelector: '.player-nav.next',
  titleSelector: '#playing-bar .song-info .song-name',
  artistSelector: '#playing-bar .song-info .artist-name',
  playStateSelector: '.player-nav.play',
  playStateClass: 'playing',
  artworkImageSelector: '.player.playing .artwork img',
  watchedElements: ['#playing-bar']
});

controller.override("getAlbumArt", function() {
  var img = document.querySelector(this.artworkImageSelector);
  this.cachedImage = (img && img.src) || this.cachedImage
  return this.cachedImage;
})