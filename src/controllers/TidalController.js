var config = {
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  useLazyObserving: true,
  playStateClass: 'play-controls__main-button--playing',
  nextSelector: '.icon-Playback_next',
  previousSelector: '.icon-Playback_previous'
}

config.artworkImageSelector = '.player__image-container__image';
config.frameSelector = '.player__wrapper';
config.playStateSelector = '.play-controls__main-button--playing';
config.playSelector = '.play-controls__play';
config.pauseSelector = '.play-controls__pause';
config.titleSelector = '.player__heading';
config.artistSelector = '.player__links';

controller = new BasicController(config);
controller.override('getAlbumArt', function () {
  var img = this.doc().querySelector(this.artworkImageSelector);
  return img && img.src.replace(/\d+x\d+/, "640x640");
});
