controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
    thumbsUp: true,
    thumbsDown: true
  },
  playStateSelector: '#play_pause_icon',
  playStateClass: 'icon-bicons_pause',
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

// grab url from background-image and upgrade to medium size
controller.override('getAlbumArt', function() {
  var art = document.getElementById("t-art");
  if (!art) {
    return null;
  }
  var artURL = getComputedStyle(art).getPropertyValue('background-image').slice(4,-1);
  var artMed = artURL.replace('small', 'medium');
  return artMed;
});

// listen for click to recheck for play state
document.body.addEventListener("click", function() {
  setTimeout(sendState, 1000);
});
