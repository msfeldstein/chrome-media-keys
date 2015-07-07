console.log("Overcast")
// This is a template file and should not be included anywhere
// Copy this file to create new basic controllers
// It is probably a good idea to remove all the comments for the final submission of a controller
controller = new BasicController({
  supports: { // Supports can be true or false, or not included
    playpause: true,
    next: true,
    previous: true
  },
  playPauseSelector: '#playpausebutton',
  nextSelector: '#seekforwardbutton',
  previousSelector: '#seekbackbutton',
  titleSelector: '.titlestack .title',
  artistSelector: '.titlestack .caption2',
  artworkImageSelector: '.fullart_container img',
  watchedElements: ['body']
});


controller.override('isPlaying', function() {
  var playpause = document.querySelector('#playpausebutton_pauseicon');
  console.log("Is playing", playpause, playpause.style.display)
  return playpause && playpause.style.display != 'none';
});
