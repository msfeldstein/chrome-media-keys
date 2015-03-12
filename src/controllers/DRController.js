console.log("Loaded drcontroller")

controller = new BasicController({
  supports: {
    playpause: true
  },
  playStateSelector: ".dr-widget-audio-player button[class$='large']",
  playStateClass: 'dr-icon-stop-large',
  playPauseSelector: ".dr-widget-audio-player button[class$='large']",
  watchedElements: [".dr-widget-audio-player"]
});