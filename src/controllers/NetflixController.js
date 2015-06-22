controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
  },
  playStateSelector: '.player-control-button.player-play-pause',
  playStateClass: 'pause',
  playPauseSelector: '.player-control-button.player-play-pause',
  nextSelector: '.player-control-button.player-next-episode',
  titleSelector: '.player-status > span:nth-child(3)',
  artistSelector: '.player-status-main-title',
  watchedElements: ['body']
});

controller.override('getAlbumArt', function() {
  var video = document.querySelector('video'),
    canvas = document.createElement('canvas'),
    ctx;

  if ( ! video || ! video.videoWidth || ! video.videoHeight )
    return null;

  canvas.width = video.videoWidth * .2;
  canvas.height = video.videoHeight * .2;
  ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL();
});
