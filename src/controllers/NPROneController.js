controller = new BasicController({
  supports: { 
    playpause: true,
    next: true,
    previous: true,
    thumbsUp: true,
  },
  playStateSelector: 'toggle-play .player__play-control__icon',
  playStateClass: '.player__play-control__icon--play', 
  playPauseSelector: 'toggle-play>button.player__play-control', 
  nextSelector: 'skip>button.player__play-control', 
  previousSelector: 'rewind>.player__play-control',
  titleSelector: 'h1.card__title', 
  artistSelector: '.card__meta [itemprop="name"]', 
  artworkImageSelector: '#primaryImage>img', 
  thumbsUpSelector: 'interesting-button>button', 
  isThumbsUpSelector: 'interesting-button>button.card__button--active', 
});

controller.override('isPlaying', function () {
  var isPaused = !!document.querySelector('.player__play-control__icon--play');
  var isLoading = !!document.querySelector('.player__play-control__icon--loading');
  var isPlaying = !!document.querySelector('.player__play-control__icon--pause');

  return isPaused ? false : isLoading || isPlaying;
});
