controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    favorite: true
  },
  playStateSelector: '#player_pause_button',
  playSelector: '#player_play_button',
  pauseSelector: '#player_pause_button',
  nextSelector: '#player_skip_button',
  titleSelector: '.now_playing .title_artist .t',
  artistSelector: '.now_playing .title_artist .a',
  artworkImageSelector: '.cover',
  favoriteSelector: '.like',
  isFavoriteSelector: '.like.active',

  watchedElements: ['.now_playing', '#player_box']
});

controller.override('isPlaying', function() {
    return document.getElementById('player_pause_button').style.display != "none";
});
