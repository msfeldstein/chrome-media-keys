controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playPauseSelector: '#audio_player-play',
  nextSelector: '#audio_player-skip',
  titleSelector: '.current-playlist-playing strong',
  artistSelector: '.current-playlist-playing dfn',
  playStateSelector: '#audio_content > div',
  playStateClass: 'playing',
  artworkImageSelector: '.current-playlist-playing img'
});