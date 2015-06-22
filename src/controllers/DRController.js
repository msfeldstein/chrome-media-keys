console.log("Loaded drcontroller")

controller = new BasicController({
  supports: {
    playpause: true
  },
  playStateClass: 'dr-icon-stop-large',
  playPauseSelector: ".dr-widget-audio-player button[class$='large']",
  watchedElements: [".dr-widget-audio-player"]
});

controller.override("isPlaying", function() {
  var playPauseButton = document.querySelector(".dr-widget-audio-player button[class$='large']")
  return playPauseButton.classList.contains("dr-icon-stop-large") || playPauseButton.classList.contains("dr-icon-pause-large")
})
controller.override("getTitle", function(){ return "Dr.dk Radio" })