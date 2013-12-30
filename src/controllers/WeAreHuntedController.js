controller = {
    init: function() {
        document.body.addEventListener("DOMSubtreeModified", sendState);
        return true;
    },
    name: "We Are Hunted",
    nextSong: function() {
        var next = document.getElementById('player_next');
        fireEvent(next, 'click');
    },
    previousSong: function() {
        var previous = document.getElementById('player_prev');
        fireEvent(previous, 'click');
    },
    play: function() {
        var play = document.getElementById('player_play');
        fireEvent(play, 'click');
    },
    supports: {
        next:true,
        previous:true,
        playpause:true,
        favorite: true
    },
    getFavoriteTag: function() {
      return document.querySelector('#player_fav a');
    },
    favorite: function() {
      fireEvent(this.getFavoriteTag(), 'click');
    },
    isPlaying: function() {
        return document.getElementById("player_play").getElementsByTagName('a')[0].classList.contains('playing');
    },
    getAlbumArt: function() {
        var grid_item = document.querySelectorAll('.grid_item.playing')[0];
        if (!grid_item) return;
        var ahref = grid_item.getElementsByTagName('a')[0];
        var background = ahref.style.backgroundImage;
        return background.substring(4, background.length - 1);
    },
    getState: function() {
        var state = {};
        state.albumArt = this.getAlbumArt();
        state.playing = this.isPlaying();
        state.favorite = this.getFavoriteTag().classList.contains('fav');
        var trackInfo = document.getElementById('track-details');
        state.artist = trackInfo.getElementsByClassName('artist-title')[0].innerText;
        state.title = trackInfo.getElementsByClassName('track-title')[0].innerText;
        return state;
    }
}
