controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    previous: true
  },
  playStateSelector: '.mejs-list ol li',
  playStateClass: 'current',
  playPauseSelector: '.mejs-playpause-button',
  nextSelector: '.mejs-nexttrack',
  previousSelector: '.mejs-prevtrack',
  titleSelector: '#playerInfo',
  artistSelector: '.single-record .row .col-sm-7 h1',
  artworkImageSelector: '.single-record .row .col-sm-5 .img-thumbnail'
});
