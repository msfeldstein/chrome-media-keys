controller = new BasicController({
    supports: {
        playpause: true,
        next: true,
        previous: true
    },
    playPauseSelector: '#play',
    previousSelector: '#rw',
    nextSelector: '#fw',
    titleSelector: '.playlist .current .title',
    artistSelector: '.playlist .current .artist',
    playStateSelector: '#play',
    playStateClass: 'pause',
    artworkImageSelector: '.logo'
});
 
controller.override('getAlbumArt', function() {
    // The service has no album images, so just show a nice image
    return 'http://shootthemusic.com/wp-content/uploads/2011/03/learn-to-play-guitar-thumb-5.jpg';
});
