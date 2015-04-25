controller = new BasicController({
  supports: {
    playpause: true,
    next: true
  },
  playStateSelector: '#currentSong .pull-left',
  playStateClass: 'active',
  playPauseSelector: '#currentSong .pull-left',
  nextSelector: '#playNextSong',
  artistSelector: '#currentSong .artist_name',
  titleSelector: '#currentSong .song-details',
  artworkImageSelector: '#currentSong .song_artwork'
});
