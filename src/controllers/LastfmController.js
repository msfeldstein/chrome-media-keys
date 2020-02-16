controller = {
  init: function() {
    document.querySelector('.player-bar-now-playing').addEventListener('DOMSubtreeModified', sendState);
    return true;
  },
  name: "Last.fm",
  sendStateSoon: function() {
    var title = this.getState().title;
    function keepChecking() {
      if (controller.getState().title != title) {
        sendState();
      } else {
        setTimeout(keepChecking, 300);
      }
    }
    setTimeout(keepChecking, 300);
  },
  nextSong: function() {
    clickBySelector('.media-controls .js-next.player-bar-btn');
    this.sendStateSoon();
  },
  previuosSong: function() {
    clickBySelector('.media-controls .js-previous.player-bar-btn');
    this.sendStateSoon();
  },
  play: function() {
    clickBySelector('.media-controls .js-play-pause.player-bar-btn');
    this.sendStateSoon();
  },
  isPlaying: function() {
    const playButton = document.querySelector('.media-controls .js-play-pause.player-bar-btn');
    return playButton && playButton.classList.contains('player-bar-btn--pause')
  },
  isLoved: function() {
    const loveButton = document.querySelector('.media-controls .player-bar-btn.player-bar-btn--love');
    return loveButton && loveButton.classList.contains('player-bar-btn--loved');
  },
  favorite: function() {
    clickBySelector('.media-controls .player-bar-btn.player-bar-btn--love')
    this.sendStateSoon();
  },
  supports: {
    next: true,
    previous: true,
    favorite: true,
    playpause: true
  },
  getState: function() {
    const art =  document.querySelector('.player-bar-artwork.js-artwork img');
    return {
      artist: querySelectorText('.player-bar-artist-name'),
      title: querySelectorText('.player-bar-track-name'),
      albumArt: art && art.src,
      favorite: this.isLoved(),
      playing: this.isPlaying()
    };
  }
}
