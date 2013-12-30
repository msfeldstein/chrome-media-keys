controller = new BasicController({
    supports: {
        playpause: true,
        next: true,
        previous: true
    },
    playPauseSelector: '#ac_play',
    previousSelector: '.prev.ctrl',
    nextSelector: '.next.ctrl',
    titleSelector: '#ac_title',
    artistSelector: '#ac_performer',
    playStateSelector: '#ac_play',
    playStateClass: 'playing'
});