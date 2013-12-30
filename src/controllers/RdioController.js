document.body.addEventListener('DOMSubtreeModified', function() {
  sendState();
});
controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    favorite: true,
    previous: true
  },
  playStateSelector: '.left_controls .play_pause',
  playStateClass: 'playing',
  playSelector: '.left_controls .play_pause',
  pauseSelector: '.left_controls .play_pause',
  nextSelector: '.left_controls .next',
  previousSelector: '.left_controls .prev',
  titleSelector: '.bottom .song_title',
  artistSelector: '.bottom .artist_title',
  artworkImageSelector: '.bottom .queue_art'
});
