controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.controls_toggle i',
  playStateClass: 'icon-pause',
  playPauseSelector: '.controls_toggle',
  nextSelector: '.controls_next',
  previousSelector: '.controls_prev',
  titleSelector: '.player_mediaName',
  artistSelector: '.player_mediaName',
  artworkImageSelector: '.playlistSelected .media-object',
  click: function(div) {
    fireEvent(div, 'mousedown');
    fireEvent(div, 'mouseup');
    fireEvent(div, 'mouseout');
  }
});

controller.override('play', function() {
  this.click(document.querySelector(this.playPauseSelector))
})

controller.override('nextSong', function() {
  this.click(document.querySelector(this.nextSelector))
})

controller.override('previousSong', function() {
  this.click(document.querySelector(this.previousSelector))
})

