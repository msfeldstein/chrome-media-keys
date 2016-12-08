// This is a template file and should not be included anywhere. To create a new
// controller, copy this file to create a new basic controller, and create an
// entry in the `mappings.coffee` file. 
// 
// Be sure to remove all all unused elements as well as all of the comments for
// the final submission of a controller.
controller = new BasicController([{
  supports: { // Supports can be true or false, or not included
    playpause: true,
    next: true,
    previous: true,
    thumbsUp: true,
    thumbsDown: true,
    favorite: true,
  },
  frameSelector: '', // Element to identify the frame that contains the rest of the elements
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

  // This method determines whether this configuration object should be used. If
  // there is no test method, then the configuration is used by default. Only
  // the object with the first successful test is used to create the controller.
  test: function () {
    // returns a boolean 
  }
  
  // These methods can be used to override the above selectors. It is still
  // recommended to declare the selectors above. This is useful when players
  // have elements that don't adhere to the simple querySelectory / click event
  // style.  
  
  getTitle: function () {
    // returns a string of the title of the track
  },

  getArtist: function () {
    // returns a string of the artist
  },

  isPlaying: function () {
    // returns a boolean, true when playing, false when not
  },

  getAlbumArt: function () {
    // returns a string representing the URL of the ablum art
  },

  play: function () {
    // plays current track
  },

  pause: function () {
    // pauses current track
  },

  nextSong: function () {
    // advances to next track
  },

  previousSong: function () {
    // rewinds or goes previous track
  },
  
  favorite: function () {
    // marks track as favorite
  },
  
  thumbsUp: function () {
    // thumbs-up current track
  },
  
  thumbsDown: function () {
    // thumbs-down current track
  },
}]);
