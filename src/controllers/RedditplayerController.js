controller = new BasicController({
  supports: {
    playpause: true,
    previous: true,
    next: true
  },
  playStateSelector: '.item.play.button',
  playStateClass: 'active',
  playPauseSelector: '.icon.play',
  previousSelector: '.icon.backward',
  nextSelector: '.icon.forward',
  titleSelector: '.ui.item.active .title',
  artistSelector: '.ui.item.active .subreddit',
  artworkImageSelector: '.ui.item.active img'
});
