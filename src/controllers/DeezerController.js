controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
    favorite: true
  },
  playSelector: '#player_control_play',
  pauseSelector: '#player_control_pause',
  nextSelector: '#player_control_next',
  previousSelector: '#player_control_prev',
  titleSelector: '#player_track_title',
  artistSelector: '#player_track_artist',
  artworkImageSelector: '#naboo_menu_infos_cover',
  favoriteSelector: '#player_action_love',
  isFavoriteSelector: '#player_action_love.selected',
  watchedElements: ['#player_control_pause']
});

controller.override('isPlaying', function() {
  return document.querySelector('#player_control_play').style.display == 'none';
});