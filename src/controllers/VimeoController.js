controller = new BasicController({
  supports: {
    playpause: true
  },
  playStateSelector: '.controls-wrapper .play',
  playStateClass: 'state-playing',
  playPauseSelector: '.controls-wrapper .play',
  titleSelector: '.video_meta .clip_title',
  artistSelector: '.video_meta .clip_header_author_name',
  artworkImageSelector: '.selected .spotlight_profile_link img'
});
