console.log("DIFMs")
controller = new BasicController({
  supports: {
    playpause: true
  },
  playStateSelector: '.controls .ico',
  playStateClass: 'icon-pause',
  playPauseSelector: '.controls .ico',
  artworkImageSelector: '.track-region .artwork img',
  titleSelector: ".track-name",
  watchedElements: ["body"]
});

controller.override("getTitle", function() {
  var info = this.querySelectorText(".track-title")
  return info && info.split(" - ")[1];
})

controller.override("getArtist", function() {
  var info = this.querySelectorText(".track-title")
  return info && info.split(" - ")[0];
})
