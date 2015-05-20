// This is a template file and should not be included anywhere
// Copy this file to create new basic controllers
// It is probably a good idea to remove all the comments for the final submission of a controller
controller = new BasicController({
  supports: { // Supports can be true or false, or not included
    playpause: true,
    next: true,
    previous: true,
    thumbsUp: true,
    thumbsDown: true,
    favorite: true,
  },
  playStateSelector: '', // Element to observe to see if it's playing or not
  playStateClass: '', // Class to check if the playStateSelector element has to determine if its playing
  playPauseSelector: '', // Element to click to toggle play/pause
  playSelector: '', // Element to click to play. Used when play and pause are separate elements
  pauseSelector: '', // Element to click to pause. Used when play and pause are separate elements
  nextSelector: '', // Element to click to go to the next track
  previousSelector: '', // Element to click to go previous track
  titleSelector: '', // Element to pull text from for the title
  artistSelector: '', // Element to pull text from for the artist
  artworkImageSelector: '', // Element to pull src from for the artwork
  favoriteSelector: '', // Element to click to toggle favorite
  isFavoriteSelector: '', // Element to check if the current song is a favorite
  thumbsUpSelector: '', // Element to click to toggle thumbs up
  isThumbsUpSelector: '', // Element to check if the current song has a thumbs up
  thumbsDownSelector: '', // Element to click to toggle thumbs down
  isThumbsDownSelector: '', // Element to check if the current song has a thumbs down
  watchedElements: ['',''], // Additional elements to watch for changes in order to send an update in play state.
    // Control elements specified by the selectors above are watched automatically.
});

// These methods can be used to override the above selectors. It is still recommended to declare the selectors above
// This is useful when players have elements that don't adhere to the simple querySelectory / click event style.
controller.override('getTitle', function() {
  // getTitle needs to return something
});

controller.override('getArtist', function() {
  // getArtist needs to return something
});

controller.override('isPlaying', function() {
  // isPlaying needs to return something
});

controller.override('getAlbumArt', function() {
  // getAlbumArt needs to return something
});

controller.override('play', function() {
  // used to replace the action of clicking the play button
});

controller.override('pause', function() {
  // used to replace the action of clicking the pause button
});

controller.override('nextSong', function() {
  // used to replace the action of clicking the next button
});

controller.override('previousSong', function() {
  // used to replace the action of clicking the previous button
});
