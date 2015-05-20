controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true,
    thumbsUp: true,
    thumbsDown: true,
  },
  playStateSelector: '.mp3MasterPlayGroup',
  playStateClass: 'playing',
  titleSelector: '#nowPlayingSection .title',
  artistSelector: '#nowPlayingSection .artistName span',
  artworkImageSelector: '#nowPlayingSection .albumImage',
  thumbsUpSelector: '#thumbsUp > span',
  isThumbsUpSelector: '#thumbsUp > span.selected',
  thumbsDownSelector: '#thumbsDown > span',
  isThumbsDownSelector: '#thumbsDown > span.selected',
	click: function(div) {
    fireEvent(div, 'mousedown');
    fireEvent(div, 'mouseup');
    fireEvent(div, 'mouseout');
  },
});

controller.override('getAlbumArt', function() {
  var img = document.querySelector("#nowPlayingSection .albumImage");
  if (!img) return "";
  return img.src && img.src.replace('45_', '500_');
});

controller.override('play', function() {
  var button = document.querySelector("*[playeraction='togglePlay']");
  this.click(button);
});

controller.override('nextSong', function() {
  var button = document.querySelector("*[playeraction='next']");
  this.click(button);
});

controller.override('previousSong', function() {
  var button = document.querySelector("*[playeraction='previous']");
  this.click(button);
});