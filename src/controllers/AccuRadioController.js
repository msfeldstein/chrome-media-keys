console.log('AccuRadio');

controller = new BasicController({
  useLazyObserving: true,
  supports: {
    playpause: true,
    next: true,
    previous: false
  },
  watchedElements: ['#playerWrapper'],
  playSelector: '#playerPlayButton',
  pauseSelector: '#playerPauseButton',
  nextSelector: '#playerSkipButton',
  titleSelector: '#songtitle',
  artistSelector: '#songartist',
  artworkImageSelector: '#albumArtImg',
  isPlaying: function() {
    return (document.querySelector('#playerPauseButton') !== null);
  }
});
