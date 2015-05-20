console.log("Running Spotify");
controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  useLazyObserving: true,
  frameSelector: '#app-player',
  playStateSelector: '#play-pause',
  playStateClass: 'playing',
  playPauseSelector: '#play-pause',
  nextSelector: '#next',
  previousSelector: '#previous',
  titleSelector: '#track-name',
  artistSelector: '#track-artist',
  artworkImageSelector: '#cover-art .sp-image-img',
});

controller.override('getAlbumArt', function() {
  return document.querySelector(this.frameSelector).contentDocument.querySelector('#cover-art .sp-image-img').style.backgroundImage.slice(4, -1);
});
