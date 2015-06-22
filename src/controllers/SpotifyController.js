if (!!document.querySelector('#app-player')) { // Old Player
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
    artistSelector: '#track-artist'
  });

  controller.override('getAlbumArt', function() {
    return document.querySelector(this.frameSelector).contentDocument.querySelector('#cover-art .sp-image-img').style.backgroundImage.slice(4, -1);
  });
} else { // New Player
  controller = new BasicController({
    supports: {
    playpause: true,
    next: true,
    previous: true
    },
    useLazyObserving: true,
    frameSelector: '#main',
    playStateSelector: '#play',
    playStateClass: 'playing',
    playPauseSelector: '#play',
    nextSelector: '#next',
    previousSelector: '#previous',
    titleSelector: '.caption .track',
    artistSelector: '.caption .artist'
  });

  controller.override('getAlbumArt', function() {
    return document.querySelector(this.frameSelector).contentDocument.querySelector('#large-cover-image').style.backgroundImage.slice(4, -1);
  });
}
