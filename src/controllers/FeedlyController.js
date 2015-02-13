
controller = new BasicController({
  supports: {
    playpause: true
  },
  titleSelector: '.entryHeader .title',
  artistSelector: '.entryHeader .sourceTitle',
  artworkImageSelector: 'img.pinable'
});

controller.getAudio = function() {
  return document.querySelector("audio");
}

controller.override('play', function() {
  if (controller.isPlaying())
    controller.getAudio().pause();
  else
    controller.getAudio().play();
});

controller.override('pause', function() {
  controller.getAudio().pause();
  console.log("Pause")
});

controller.override('isPlaying', function() {
  var audio = controller.getAudio()
  return audio && !audio.paused;
});
document.addEventListener('play', function(e){
    sendState()
}, true);