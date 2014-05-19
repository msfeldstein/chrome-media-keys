controller = new BasicController({
  supports: {
    playpause: true,
    previous: true,
    next: true,
    thumbsUp: true
  },
  playStateSelector: '#btnplay',
  playStateClass: 'pause_bt',
  playPauseSelector: '#btnplay',
  previousSelector: '#divplayer .prev_bt',
  nextSelector: '#divplayer .next_bt',
  titleSelector: '#divsonginfo .music_name',
  artistSelector: '#divsonginfo .singer_name',
  artworkImageSelector: '#divsonginfo img',
  thumbsUpSelector: "#divsonginfo .btn_like, #divsonginfo .btn_liked",
  isThumbsUpSelector: "#divsonginfo .btn_liked"
});

controller.override('getAlbumArt', function(_super) {
  var art = _super();
  return art && art.replace('_90/', '_300/');
});

controller.getTitle = function() {
  return document.querySelector(this.titleSelector)
      .getAttribute('title').replace(/\s+/g, ' ');
};
