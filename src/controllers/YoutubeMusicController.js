controller = new BasicController({
    supports: {
        playpause: true,
        next: true,
        previous: true,
        thumbsUp: true,
        thumbsDown: true,
    },
    playStateSelector: '.play-pause-button',
    playPauseSelector: '.play-pause-button',
    nextSelector: '.next-button',
    previousSelector: '.previous-button',
    titleSelector: '.content-info-wrapper > .title',
    artistSelector: '.content-info-wrapper .subtitle > .byline',
    artworkImageSelector: '.ytmusic-player-bar > .image',
    thumbsUpSelector: '.thumbs > .like',
    thumbsDownSelector: '.thumbs > .dislike',
});


controller.override('init', function (_super) {
    if (document.querySelector(this.playStateSelector))
        return _super();
    else
        return false;
});

controller.override('isPlaying', function() {
    var button = document.querySelector(this.playStateSelector);
    var label = button !== null && button.getAttribute('aria-label');
    return label && label.match(/Pause/i);
});

controller.override('getAlbumArt', function (_super) {
    var art = _super();
    return art && art.concat('-w300-h300');
});
