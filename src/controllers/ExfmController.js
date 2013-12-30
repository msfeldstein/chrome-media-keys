controller = {
    init: function() {
      var playButton = document.getElementById('play_button');
      if (!playButton) return false;
      document.getElementById('display').addEventListener('DOMSubtreeModified', sendState);
      return true;
    },
    name: "Ex.fm",
    nextSong: function() {
      clickById('next_button');
    },
    previousSong: function() {
      clickById('prev_button');
    },
    isPlaying: function() {
      var playButton = document.getElementById('play_button');
      return playButton.classList.contains('paused');
    },
    play: function() {
      clickById('play_button');
      setTimeout(sendState, 100);
    },
    favorite: function() {
      clickById('current_song_love_icon');
    },
    supports: {
        next:true,
        previous:true,
        playpause:true,
        favorite: true
    },
    getState: function() {
        var state = {};
        state.artist = innerTextById('display_artist');
        state.title = innerTextById('display_song');
        state.playing = this.isPlaying();
        state.favorite = document.getElementById('current_song_love_icon').classList.contains('on');
        var albumDiv = document.getElementById('display_coverart');
        if (albumDiv) {
          var urls = albumDiv.style.backgroundImage;
          urls = urls.substring(4, urls.indexOf(')'));
          urls = urls.replace(/[0-9]{2}_\.jpg/, '300_.jpg');
          state.albumArt = urls;
        }
        return state;
    }
}
