controller = new BasicController({
    supports: {
        playpause: true,
        next: true,
        thumbsUp: true,
        thumbsDown: true
    },
    playPauseSelector: '.player-controls__play',
    nextSelector: '.skip',
    titleSelector: '.slider__item:nth-child(3) .track__title',
    artistSelector: '.slider__item:nth-child(3) .track__artists',
    playStateSelector: 'body',
    playStateClass: 'body_state_playing',
    artworkImageSelector: '.slider__item:nth-child(3) .track__cover',
    thumbsUpSelector: '.player-controls .like_action_like',
    isThumbsUpSelector: '.player-controls .button_checked',
    thumbsDownSelector: '.player-controls .like_action_dislike'
});
