controller = new BasicController({
  supports: {
    playpause: true,
    favorite: true
  },
  playStateSelector: '#play',
  playSelector: '#play',
  pauseSelector: '#pause',
  titleSelector: 'p.title > a',
  artistSelector: 'p.artist > a',
  favoriteSelector: '#toggle-mystations > span',
  isFavoriteSelector: '#toggle-mystations.in-mystations',
  artworkImageSelector: 'div.playlister.clearfix > img'
});

controller.override('isPlaying', function() {
    return document.querySelector(this.pauseSelector).style.display == 'inline-block';
});
