controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '#play-pause',
  playStateClass: 'playing',
  playPauseSelector: '#play-pause',
  nextSelector: '#next',
  previousSelector: '#previous',
  artistSelector: '#now-playing-title strong',
  artworkImageSelector: '#now-playing .albumart img'
});


controller.override('getTitle', function() {
  var titleAndArtist = document.querySelector("#now-playing-title").textContent;
  var artist = this.getArtist();
  return titleAndArtist.substring(artist.length);
});
