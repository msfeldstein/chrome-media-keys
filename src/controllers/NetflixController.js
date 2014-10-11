controller = {
    init: function() {
        document.body.addEventListener("DOMSubtreeModified", sendState);
        return true;
    },
    supports: {
        next:true,
        playpause:true
    },
    play: function() {
        var button = document.querySelector('.player-control-button.player-play-pause');
        fireEvent(button, 'click');
    },
    nextSong: function() {
        var button = document.querySelector('.player-control-button.player-next-episode');
        fireEvent(button, 'click');
    },
    isPlaying: function() {
        var playbutton = document.querySelector('.player-control-button.player-play-pause');
        return playbutton && playbutton.classList.contains('pause');
    },
    getAlbumArt: function() {
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
    },
    getTitleParts: function() {
        var parts = Array.prototype.slice.call(document.querySelectorAll('.player-status span')),
            main = parts.filter(function(t){return t.classList.contains('player-status-main-title');}).map(function(t){return t.innerText;}),
            sub = parts.filter(function(t){return !t.classList.contains('player-status-main-title');}).map(function(t){return t.innerText;});
        return [main.join(' '),sub.join(' ')];
    },
    getTitle: function() {
        var parts = this.getTitleParts();
        return parts[1] ? parts[1] : parts[0];
    },
    getArtist: function() {
        var parts = this.getTitleParts();
        return parts[1] ? parts[0] : parts[1];
    },
    getState: function() {
        var state = {};
        state.playing = this.isPlaying();
        state.albumArt = this.getAlbumArt();
        state.title = this.getTitle();
        state.artist = this.getArtist();
        return state;
    }
};