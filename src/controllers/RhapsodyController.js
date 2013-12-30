controller = {
    init: function() {
        document.body.addEventListener("DOMSubtreeModified", sendState);
        return true;
    },
    name: "Rhapsody",
    supports: {
        playpause: true,
        next: true,
        previous: true,
        favorite: true
    },
    nextSong: function() {
        clickById("player-next");
    },
    previousSong: function() {
        clickById("player-previous");
    },
    favorite: function() {
        clickById("player-favorite");
    },
    isPlaying: function() {
      return document.querySelector("#player-play").style.display == "none";
    },
    play: function() {
        if (this.isPlaying())
            clickById("player-pause");
        else
            clickById("player-play");
    },
    albumArt: function() {
        var arts = document.querySelectorAll(".player-album-thumbnail");
        for (var i = 0; i < arts.length; ++i) {
            var art = arts[i];
            if (getComputedStyle(art).opacity == 1) {
                return art.querySelector("img").src;
            }
        }
        return "";
    },
    getState: function() {
        var state = {};
        state.playing = this.isPlaying();
        var favoriteButton = document.querySelector("#player-favorite");
        state.favorite = favoriteButton && favoriteButton.classList.contains("selected");
        state.title = innerText("player-track");
        state.artist = innerText("player-artist");
        state.albumArt = this.albumArt();
        return state;
    }
}
