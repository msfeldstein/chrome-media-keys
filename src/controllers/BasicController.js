function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}


/*

properties:
  playStateSelector: Element to observer to see if it's playing or not
  playStateClass: Class to check if the playStateSelector element has to determine if its playing
  playPauseSelector: Element to click to toggle play/pause
  nextSelector: Element to click to go to the next track
  previousSelector: Element to click to go previous track
  titleSelector: Element to pull text from for the title
  artistSelector: Element to pull text from for the artist
  artworkImageSelector:Element to pull src from for the artwork

*/
var BasicController = function(params) {
  this.name = document.location.hostname;
  for (var key in params) {
    this[key] = params[key];
  }
  if (params.doThrottling) {
    var sendStateThrottled = throttle(sendState, 250);  
    this.stateChangeObserver = new WebKitMutationObserver(function(mutations, observer) {
      sendStateThrottled();
    });
  } else {
    this.stateChangeObserver = new WebKitMutationObserver(function(mutations, observer) {
      sendState();
    });
  }
};

BasicController.prototype.init = function() {
  var observedKeys = [
    'playStateSelector',
    'titleSelector',
    'artistSelector',
    'artworkImageSelector',
    'thumbsUpSelector',
    'thumbsDownSelector',
    'favoriteSelector'
  ];
  for (var i = 0; i < observedKeys.length; ++i) {
    this.observeStateChanges(this[observedKeys[i]]);
  }
  if (this.watchedElements) {
    for (var i = 0; i < this.watchedElements.length; ++i) {
      this.observeStateChanges(this.watchedElements[i]);
    }
  }
  return true;
}

BasicController.prototype.observeStateChanges = function(key) {
  var el = document.querySelector(key);
  if (el) 
    this.stateChangeObserver.observe(el, {attributes: true, characterData: true, subtree:true});
}

BasicController.prototype.fireEvent = function(element,event, data){
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent(event, true, true );
  if (data) evt.data = data;
  return!element.dispatchEvent(evt);
}

BasicController.prototype.clickQS = function(qs) {
  this.fireEvent(document.querySelector(qs), 'click');
}

BasicController.prototype.querySelectorText = function(qs) {
  var div = document.querySelector(qs);
  if (!div) return null;
  return div.innerText || div.textContent;
}

BasicController.prototype.querySelectorContainsClass = function(qs, clazz) {
  var div = document.querySelector(qs);
  if (!div) return false;
  return div.classList.contains(clazz);
}

BasicController.prototype.play = function() {
  if (this.playPauseSelector) {
    this.clickQS(this.playPauseSelector);  
  } else if (this.playSelector) {
    if (this.isPlaying()) {
      this.clickQS(this.pauseSelector);
    } else {
      this.clickQS(this.playSelector);
    }
  }
  
};

BasicController.prototype.nextSong = function () {
  if (this.nextSelector)
    this.clickQS(this.nextSelector);
  else if (this.nextScript)
    this.runInPage(this.nextScript);
}

BasicController.prototype.previousSong = function () {
  this.clickQS(this.previousSelector);
}

BasicController.prototype.thumbsUp = function() {
  this.clickQS(this.thumbsUpSelector);
}

BasicController.prototype.thumbsDown = function() {
  this.clickQS(this.thumbsDownSelector);
}

BasicController.prototype.favorite = function() {
  this.clickQS(this.favoriteSelector);
}

BasicController.prototype.isPlaying = function() {
  var i = this.querySelectorContainsClass(this.playStateSelector, this.playStateClass);
  return i;
}

BasicController.prototype.getAlbumArt = function () {
  if (this.artworkImageSelector) {
    var img = document.querySelector(this.artworkImageSelector);
    return img && img.src;
  }
  return undefined;
}

BasicController.prototype.getTitle = function() {
  return this.querySelectorText(this.titleSelector);
}

BasicController.prototype.getArtist = function() {
  return this.querySelectorText(this.artistSelector);
}

BasicController.prototype.getState = function() {
  var state = {};
  state.title = this.getTitle();
  state.artist = this.getArtist();
  state.albumArt = this.getAlbumArt();
  state.playing = this.isPlaying();
  state.service = document.location.host;
  if (this.isThumbsUpSelector) state.thumbsUp = !!document.querySelector(this.isThumbsUpSelector);
  if (this.isThumbsDownSelector) state.thumbsDown = !!document.querySelector(this.isThumbsDownSelector);
  if (this.isFavoriteSelector) state.favorite = !!document.querySelector(this.isFavoriteSelector);
  return state;
}

BasicController.prototype.override = function(methodName, newMethod) {
  var oldMethod = this[methodName];
  var that = this;
  var superMethod = function() {
    return oldMethod.call(that);
  }
  this[methodName] = function() {
    return newMethod.call(that, superMethod);
  }
}

BasicController.prototype.runInPage = function(code) {
  var script = document.createElement("script");
  script.innerHTML = code;
  document.body.appendChild(script);
  var f = function() {
    document.body.removeChild(script);
  }
  setTimeout(f, 1000);
}

