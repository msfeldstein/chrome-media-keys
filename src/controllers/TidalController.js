var config = {
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  useLazyObserving: true,
  playStateClass: 'play-controls__main-button--playing',
  nextSelector: '.icon-Playback_next',
  previousSelector: '.icon-Playback_previous',
  artworkImageSelector: '.player__image-container__image',
  frameSelector: '.player__wrapper',
  playStateSelector: '.play-controls__main-button--playing',
  playSelector: '.play-controls__play',
  pauseSelector: '.play-controls__pause',
  titleSelector: '.player__heading',
  artistSelector: '.player__links'
}

controller = new BasicController(config);

controller.override('getAlbumArt', function () {
  var img = this.doc().querySelector(this.artworkImageSelector);
  return img && img.src.replace(/\d+x\d+/, "640x640");
});
