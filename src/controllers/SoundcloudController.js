controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
	favorite: true
  },
  playStateSelector: '.playControl',
  playStateClass: 'playing',
  playPauseSelector: '.playControl',
  nextSelector: '.skipControl__next',
  previousSelector: '.skipControl__previous',
  titleSelector: '.playbackSoundBadge__title > span:nth-child(2)',
  favoriteSelector: '.playbackSoundBadge__like',
  isFavoriteSelector: '.playbackSoundBadge__like .sc-button-selected'
});

controller.override('getAlbumArt', function() {
    return document.querySelector('.playbackSoundBadge__avatar > div > span.image__full').style.backgroundImage.slice(4, -1).replace("-t120x120.jpg", "-t500x500.jpg");
});
