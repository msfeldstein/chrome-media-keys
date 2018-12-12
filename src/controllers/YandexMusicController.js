controller = new BasicController({
    supports: {
        playpause: true,
        next: true,
        previous: true,
        favorite: true,
        thumbsDown: false  // Changes dynamically
    },
    playPauseSelector: '.player-controls__btn_play',
    previousSelector: '.player-controls__btn_prev',
    nextSelector: '.player-controls__btn_next',
    titleSelector: '.player-controls .track__title',
    artistSelector: '.player-controls .track__artists',
    playStateSelector: '.player-controls__btn_play',
    playStateClass: 'player-controls__btn_pause',
    artworkImageSelector: '.player-controls .track-cover',
    favoriteSelector: '.player-controls .d-like',
    isFavoriteSelector: '.player-controls .d-like_on',
    thumbsDownSelector: '.dislike.player-controls__btn',
    watchedElements: ['.player-controls__track-container']
});
 
controller.override('getAlbumArt', function() {
    var img = document.querySelector(this.artworkImageSelector);
    if (img) {
        return img.src.replace('50x50', '150x150');
    }
    return undefined
});

controller.override('isPlaying', function(_super) {
    var thumbsDown = document.querySelector(this.thumbsDownSelector);
    if (thumbsDown) {
        this.supports.thumbsDown = window.getComputedStyle(thumbsDown).display != 'none';
    }
    return _super()
});
