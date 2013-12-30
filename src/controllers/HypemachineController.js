controller = {
    init: function() {
        this.playPauseButton = document.getElementById('playerPlay');
        if (!this.playPauseButton) return false;
        this.next = document.getElementById('playerNext');
        this.previous = document.getElementById('playerPrev');
        this.songDetails = document.getElementById('player-nowplaying');
        document.body.addEventListener("DOMSubtreeModified", sendState);
        return true;
    },
    name: "Hypemachine",
    supports: {
        playpause: true,
        next: true,
        previous: true,
        favorite: true
    },
    nextSong: function() {
        clickById('playerNext');
    },
    previousSong: function() {
        clickById('playerPrev');
    },
    getSongTitle: function() {
        return querySelectorText("#player-controls [href^='/artist']");
    },
    getArtist: function() {
        return querySelectorText("#player-controls [href^='/track']");
    },
    isPlaying: function() {
      return hasClassById('playerPlay', 'pause');
    },
    play: function() {
      clickById('playerPlay');
    },
    favorite: function() {
      clickById('playerFav');
    },
    getAlbumArt: function() {
        var div = document.querySelector(".haarp-active a.thumb");
        if (!div) return this.lastUrl;
        var img = div.style.backgroundImage;
        var url = img.substring(4, img.length - 1);
        this.lastUrl = url;
        return url;
    },
    getState: function() {
        var state = {};
        state.playing = this.isPlaying();
        state.title = this.getSongTitle();
        state.artist = this.getArtist();
        state.albumArt = this.getAlbumArt();
        state.domainIcon = 'hypem.png';
        state.favorite = hasClassById('playerFav', 'fav-on');
        return state;
    }    
}