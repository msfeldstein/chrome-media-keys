controller = new BasicController({
    supports: {
        playpause: true,
        next: true,
        thumbsUp: true,
        thumbsDown: true
    },
    playPauseSelector: '.player-controls__play',
    nextSelector: '.slider__item_next .skip',
    titleSelector: '.slider__item_playing .track__title',
    artistSelector: '.slider__item_playing .track__artists',
    playStateSelector: 'body',
    playStateClass: 'body_state_playing',
    artworkImageSelector: '.slider__item_playing .track__cover',
    thumbsUpSelector: '.player-controls .like_action_like',
    isThumbsUpSelector: '.player-controls .button_checked',
    thumbsDownSelector: '.player-controls .like_action_dislike'
});

controller.override('getAlbumArt', function() {
    var span = document.querySelector(this.artworkImageSelector);
    if (span) {
        return "http:" + span.style.backgroundImage.match(/url\(\"(.+)\"\)/)[1];
    }
    return undefined
});
