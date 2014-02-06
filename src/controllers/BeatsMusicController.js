controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
    thumbsUp: true,
    thumbsDown: true
  },
  playStateSelector: '#play_pause_icon',
  playStateClass: '.icon-bicons_pause',
  playPauseSelector: '#play_pause_icon',
  nextSelector: '#t-next',
  previousSelector: '#t-prev',
  titleSelector: '.track',
  artistSelector: '.artist',
  artworkImageSelector: '#t-art',
  thumbsUpSelector: "#t-love",
  thumbsDownSelector: "#t-hate",
  isThumbsUpSelector: "#t-love.active",
  isThumbsDownSelector: "#t-hate.active",
});
console.log("Got the Beats controller");