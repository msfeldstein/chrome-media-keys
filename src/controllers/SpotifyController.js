doc = function() {
    return document.getElementById("app-player").contentWindow.document;
}

clickInDoc = function(id) {
    var d = doc();
    if (!d) return "";
    var el = d.getElementById(id);
    fireEvent(el, 'click');
}

querySelectorTextInDoc = function(qs) {
    var d = doc();
    if (!d) return "";
    var el = d.querySelector(qs);
    if (!el) return "";
    return el.textContent;
}

controller = {
    init: function() {
        var player = doc().getElementById('player');
        var controls = doc().getElementById('controls');
        if (!player || !controls) return false;
        this.stateChangeObserver = new WebKitMutationObserver(function(mutations, observer) {
            sendState();
        });
        this.observe();
        return true;
    },

    observe: function() {
        var player = doc().getElementById('player');
        var controls = doc().getElementById('controls');
        this.stateChangeObserver.observe(player, {attributes: true, characterData: true, subtree:true});
        this.stateChangeObserver.observe(controls, {attributes: true, characterData: true, subtree:true});
    },
    name: "Spotify",
    nextSong: function() {
      clickInDoc('next');
    },
    previousSong: function() {
      clickInDoc('previous');
    },
    play: function() {
      clickInDoc('play-pause');
    },
    isPlaying: function() {
      return doc() && doc().getElementById('play-pause').classList.contains('playing');
    },
    supports: {
        next:true,
        previous:true,
        playpause:true,
    },
    getAlbumArt: function() {
        var art = doc().querySelector('#cover-art .sp-image-img');
        if (!art) return "";
        var url = art.style.backgroundImage;
        return url.substring(4, url.length - 1);
    },
    getState: function() {
        var state = {};
        state.title = querySelectorTextInDoc('#track-name');
        state.artist = querySelectorTextInDoc('#track-artist');
        state.playing = this.isPlaying();
        state.albumArt = this.getAlbumArt();
        return state;
    }
}
