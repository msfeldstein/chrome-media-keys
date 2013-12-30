controller = new BasicController({
    supports: {
        playpause: true,
        next: true,
        previous: true
    },
    playPauseSelector: '.b-jambox__play',
    previousSelector: '.b-jambox__prev',
    nextSelector: '.b-jambox__next',
    titleSelector: '.js-player-title',
    artistSelector: '.js-player-artist',
    playStateSelector: '.b-jambox__play',
    playStateClass: 'b-jambox__playing',
    artworkImageSelector: '.b-jambox__display-img'
});
 
controller.override('getAlbumArt', function() {
    var img = document.querySelector(this.artworkImageSelector);
    if (img) {
        return img.src.replace('30x30', '150x150');
    }
    return undefined
});