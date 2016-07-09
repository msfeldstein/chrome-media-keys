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
    artworkImageSelector: '.player-controls .album-cover',
    favoriteSelector: '.player-controls .like',
    isFavoriteSelector: '.player-controls .like_on',
    thumbsDownSelector: '.dislike.player-controls__btn'
});
 
controller.override('getAlbumArt', function() {
    var img = document.querySelector(this.artworkImageSelector);
    if (img) {
        return img.src.replace('50x50', '150x150');
    }
    return undefined
});

controller.override('isPlaying', function(_super) {
    this.supports.thumbsDown = window.getComputedStyle(document.querySelector(this.thumbsDownSelector)).display != 'none'
    return _super()
});
