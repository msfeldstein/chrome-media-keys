controller = {
    init: function() {
      document.body.addEventListener('DOMSubtreeModified', sendState);
      return true;
    },
    name: "Turntable.fm",
    supports: {
        playpause: true,
        thumbsUp: true,
        thumbsDown: true
    },
    nextSong: function() {
    },
    thumbsUp: function() {
      clickById('awesome-button');
    },
    thumbsDown: function() {
      clickById('lame-button');
    },
    isPlaying: function() {
      var volume = document.querySelector('#volume-control');
      if (!volume) return false;
      return !volume.classList.contains('volume-mute');
    },
    play: function() {
        fireEvent(document.querySelector('#volume-control'), 'click');
    },
    getThumbsUp: function() {
        var b = document.querySelector('awesome-button');
        return b && b.classList.contains('selected');
    },
    getThumbsDown: function() {
        var b = document.querySelector('lame-button');
        return b && b.classList.contains('selected');
    },
    recordImage: "https://s3.amazonaws.com/static.turntable.fm/images/room/record.png",
    getState: function() {
        var state = {};
        state.playing = this.isPlaying();
        state.artist = querySelectorText('#songboard-artist');
        state.title = querySelectorText("#songboard-title");
        state.thumbsUp = this.getThumbsUp();
        state.thumbsDown = this.getThumbsDown();
        var art = document.querySelector('#song-log');
        if (art)
            state.albumArt = art.style.backgroundImage.substring(4,art.style.backgroundImage.length - 1)
        else
            state.albumArt = this.recordImage;
        return state;
    }
}
