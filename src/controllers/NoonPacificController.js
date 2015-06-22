controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playStateSelector: '[ng-class="{hide:playing}"]',
  playStateClass: 'hide',
  playSelector: '[ng-class="{hide:playing}"]',
  pauseSelector: '[ng-class="{hide:!playing}"]',
  nextSelector: '[ng-click="skipTrack()"]',
  titleSelector: '#playing h2',
  artistSelector: '#playing h3',
  artworkImageSelector: '.mixtape-cover img'
});
