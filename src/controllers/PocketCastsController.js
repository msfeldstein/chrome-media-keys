controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.play_pause_button',
  playStateClass: 'pause_button',
  playPauseSelector: '.play_pause_button',
  nextSelector: '.skip_forward_button',
  previousSelector: '.skip_back_button',
  titleSelector: '.player_episode',
  artistSelector: '.player_podcast_title',
  artworkImageSelector: '.player_artwork img'
});
