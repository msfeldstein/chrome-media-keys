function capitaliseFirstLetter(string)
{
  var components = string.split(' ');
  for (var i = 0; i < components.length; ++i) {
    var s = components[i];
    s = s.toLowerCase();
    s = s.charAt(0).toUpperCase() + s.slice(1);
    components[i] = s;
  }    
  return components.join(' ');
}

controller = {
    init: function() {
      this.nextButton = document.getElementById("large_next_song_button");
      this.previousButton = document.getElementById("large_previous_song_button");
      this.favoriteButton = document.getElementById("song_panel_hearts");
      this.playButton = document.getElementById("play_button");
      this.pauseButton = document.getElementById("pause_button");
      if (!this.playButton) return false;

      setInterval(sendState, 400);
      return true;
    },
    name: "thesixtyone",
    supports: {
      playpause: true,
      next: true,
      previous: true,
    },
    click: function(div) {
      fireEvent(div, 'click');
    },
    nextSong: function() {
      this.click(this.nextButton);
    },
    previousSong: function() {
      this.click(this.previousButton);
    },
    favorite: function() {
      this.click(this.favoriteButton);
    },
    play: function() {
        this.click(this.isPlaying() ? this.pauseButton : this.playButton);
    },
    isPlaying: function() {
      return (this.playButton.style.display == 'none');
    },
    getAlbumArt: function() {
      var b1 = document.getElementById('background_image');
      var b2 = document.getElementById('background_image_next');
      return b1.style.left == "100%" ? b2.src : b1.src;
    },
    getState: function() {
      var state = {};
      state.playing = this.isPlaying();
      state.artist = capitaliseFirstLetter(document.getElementById('song_panel_artist').innerText);
      state.title = capitaliseFirstLetter(document.getElementById('song_panel_title').innerText);
     // state.favorite = this.favoriteButton.classList.contains('filled');
      state.albumArt = this.getAlbumArt();
      return state;
    }
}
