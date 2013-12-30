controller = new BasicController({
  supports: {
    playpause: true,
    next: true,
    thumbsUp: true,
    thumbsDown: true
  },
  playSelector: '#btn-playpause',
  pauseSelector: '#btn-playpause',
  nextSelector: '#btn-ff',
  titleSelector: '#current-song',
  artistSelector: '#player_current_artist a',
  playStateSelector: '#btn-playpause',
  playStateClass: 'pause',
  artworkImageSelector: '#player_main_pic_img',
  thumbsUpSelector: '#btn-fav',
  thumbsDownSelector: '#player_ban',
  isThumbsUpSelector: '.szi-controls.szi-voted-up',
  isThumbsDownSelector: '.szi-controls.szi-voted-down',
});

function clickByQSInFrame(id) {
  var b = frames[1].document.querySelector(id)
  fireEvent(b, 'click');
}

function querySelectorTextInFrame(qs) {
  var el = frames[1].document.querySelector(qs)
  return el && el.textContent.trim();
}

controller = {
    init: function() {
      if (frames[1].document.body) {
        frames[1].document.body.addEventListener("DOMSubtreeModified", sendState);
      } else {
        frames[1].document.addEventListener( "DOMContentLoaded", function(){
          frames[1].document.body.addEventListener("DOMSubtreeModified", sendState);
        });
      }
      sendState();
      return true;
    },
    name: "Jango",
    supports: {
      playpause: true,
      next: true
    },
    nextSong: function() {
      clickByQSInFrame('#btn-ff');
    },
    play: function() {
      clickByQSInFrame('#btn-playpause');
    },
    isPlaying: function() {
      var button = frames[1].document.querySelector("#btn-playpause")
      return button && button.classList.contains('pause')
    },
    getAlbumArt: function() {
      var img = frames[1].document.querySelector("#player_main_pic_img");
      return img && img.src;
    },
    getState: function() {
      var state = {};
      state.albumArt = this.getAlbumArt();
      state.playing = this.isPlaying();
      state.title = querySelectorTextInFrame('#current-song');
      state.artist = querySelectorTextInFrame('#player_current_artist a');
      return state;
    }
}
