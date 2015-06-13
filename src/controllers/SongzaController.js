controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  doThrottling: true,
  playPauseSelector: '.miniplayer-control-play-pause',
  nextSelector: '.miniplayer-control-skip',
  titleSelector: '.miniplayer-info-track-title',
  artistSelector: '.miniplayer-info-artist-name',
  playStateSelector: '.player-state-song',
  playStateClass: 'player-state-play',
  artworkImageSelector: '.miniplayer-album-art',
  watchedElements: ["#player"]
});
