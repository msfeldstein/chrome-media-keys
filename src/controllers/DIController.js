controller = new BasicController({
  supports: {
    playpause: true
  },
  playStateSelector: '#ctl-play',
  playStateClass: 'pause',
  playPauseSelector: '#ctl-play',
  artworkImageSelector: '#art img',
  titleSelector: "#now-playing .title"
});

controller.override("getTitle", function() {
  var info = this.querySelectorText("#now-playing .title")
  return info && info.split(" - ")[1];
})

controller.override("getArtist", function() {
  var info = this.querySelectorText("#now-playing .title")
  return info && info.split(" - ")[0];
})
