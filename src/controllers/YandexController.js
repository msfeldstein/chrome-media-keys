controller = new BasicController({
    supports: {
        playpause: true,
        next: true,
        previous: true
    },
    playPauseSelector: '.player-controls__btn_play',
    previousSelector: '.player-controls__btn_prev',
    nextSelector: '.player-controls__btn_next',
    titleSelector: '.track__title',
    artistSelector: '.track__artists',
    playStateSelector: '.player-controls__btn_play',
    playStateClass: 'player-controls__btn_pause',
    artworkImageSelector: '.album-cover'
});
 
controller.override('getAlbumArt', function() {
    var img = document.querySelector(this.artworkImageSelector);
    if (img) {
        return img.src.replace('40x40', '150x150');
    }
    return undefined
});
