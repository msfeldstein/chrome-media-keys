const config = {
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  useLazyObserving: true,
  playStateClass: 'playing',
  nextSelector: '#next',
  previousSelector: '#previous'
}

// New version of spotify
if (window.location.hostname === 'open.spotify.com') {
  delete config.playStateClass;

  const i18nLabels = JSON.parse(
    document.querySelector('#jsonTranslations').innerHTML
  );

  config.playStateSelector = `.now-playing-bar .player-controls__buttons [aria-label="${i18nLabels['playback-control.play']}"]`;
  config.playSelector = `.now-playing-bar .player-controls__buttons [aria-label="${i18nLabels['playback-control.play']}"]`;
  config.pauseSelector = `.now-playing-bar .player-controls__buttons [aria-label="${i18nLabels['playback-control.pause']}"]`;
  config.artworkImageSelector = '.now-playing-bar .cover-art-image';
  config.artistSelector = '.now-playing-bar [href^="/artist"]';
  config.titleSelector = '.now-playing-bar [href^="/album"]';
  config.nextSelector = `.now-playing-bar .player-controls__buttons [aria-label="${i18nLabels['playback-control.skip-forward']}"]`;
  config.previousSelector = `.now-playing-bar .player-controls__buttons [aria-label="${i18nLabels['playback-control.skip-back']}"]`;

  controller = new BasicController(config);

  controller.override('isPlaying', function () {
    return !!this.doc().querySelector(config.pauseSelector);
  })

  // The album image also links to `/album/...`. Take last link for the title
  controller.override('getTitle', function () {
    const titleNodes = [...this.doc().querySelectorAll('.now-playing-bar [href^="/album"]')]

    return titleNodes.pop().textContent
  })

  // There may be multiple artists linked per title
  controller.override('getArtist', function () {
    // Spread into array because `map` does not work reliably over NodeList.
    const artistNodes = [...this.doc().querySelectorAll(config.artistSelector)]

    return artistNodes.map(artist => artist.textContent).join(', ');
  })
} else {
  if (document.querySelector('#app-player')) { // Old Player
    config.artworkImageSelector = '#cover-art .sp-image-img';
    config.frameSelector = '#app-player';
    config.playStateSelector = '#play-pause';
    config.playPauseSelector = '#play-pause';
    config.titleSelector = '#track-name';
    config.artistSelector = '#track-artist';
  } else { // New Player
    config.artworkImageSelector = '#large-cover-image';
    config.frameSelector = '#main';
    config.playStateSelector = '#play';
    config.playPauseSelector = '#pause';
    config.titleSelector = '.caption .track';
    config.artistSelector = '.caption .artist';
  }
  controller = new BasicController(config);
}

controller.override('getAlbumArt', function () {
  const img = this.doc().querySelector(this.artworkImageSelector);
  return img && img.style.backgroundImage.slice(5, -2);
})
