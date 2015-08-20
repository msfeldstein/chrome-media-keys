controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '[ng-click="PlayPauseClick()"] i',
  playStateClass: 'fa-pause',
  playSelector: '[ng-click="PlayPauseClick()"]',
  pauseSelector: '[ng-click="PlayPauseClick()"]',
  nextSelector: '[ng-click="audio.PlayNextSong()"]',
  previousSelector: '[ng-click="audio.PlayPreviousSong()"]',

  // These may seem reversed, but that's the way it is on the site.
  titleSelector: 'div.audio-player-artist p',
  artistSelector: 'div.audio-player-song p',

  artworkImageSelector: 'div.current-mixtape img.mixtape'
});
