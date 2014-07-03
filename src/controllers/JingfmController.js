controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    thumbsUp: true,
    thumbsDown: true
  },
  playStateSelector: '#playCtl',
  playStateClass: 'pause',
  playPauseSelector: '#playCtl',
  nextSelector: '#playerNext',
  titleSelector: '#mscPlr .tit',
  artworkImageSelector: '#rotateCD',
  thumbsUpSelector: "#playerLove",
  thumbsDownSelector: "#playerHate",
  isThumbsUpSelector: "#playerLove.selected",
  isThumbsDownSelector: "#playerHate.selected",
});

controller.getAlbumArt = function() {
  var url = document.querySelector(this.artworkImageSelector)
      .style.backgroundImage;
  return url.substring(4, url.lastIndexOf(')'));
};
