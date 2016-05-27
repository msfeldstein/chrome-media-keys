controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  frameSelector: '#playQueue',
  playSelector: '#startButton',
  pauseSelector: '#stopButton',
  nextSelector: '#nextButton',
  previousSelector: '#previousButton',
  titleSelector: '#songName',
  artistSelector: '#artistName',
  artworkImageSelector: 'img#coverArt',
  watchedElements: [ '#startButton', '#stopButton', '#bufferButton' ]
});

controller.override('isPlaying', function() {
  var button = this.doc().querySelector('#startButton');
  if (!button) return false;
  var isp = !( button.style.display == 'block');
  return isp;
});
