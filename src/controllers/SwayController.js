controller = {
    init: function() {
        document.body.addEventListener("DOMSubtreeModified", sendState);
        return true;
    },
    nextSong: function() {
        var next = document.getElementById('next');
        fireEvent(next, 'click');
    },
    play: function() {
        var play = document.getElementById('play');
        var pause = document.getElementById('pause');
        
        fireEvent(this.isPlaying() ? pause : play, 'click');
    },
    name: "Sway.fm",
    supports: {
        next:true,
        playpause:true
    },
    isPlaying: function() {
        return document.getElementById("play").style.display == 'none';
    },
    getState: function() {
        var state = {};
        state.albumArt = document.getElementById('imageArt').src;
        state.playing = this.isPlaying();
        var trackInfo = document.getElementById('trackInfo');
        state.artist = querySelectorText('#trackInfo .artistName');
        state.title = querySelectorText('#trackInfo .trackTitle');
        return state;
    }
}
