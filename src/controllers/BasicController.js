/*
See BasicTemplate.js for documentation and an example of a BasicController
*/

var BasicController = function(params) {
  this.name = document.location.hostname;
  for (var key in params) {
    this[key] = params[key];
  }
  if (params.doThrottling) {
    var sendStateThrottled = this.throttle(sendState, 250);
    this.stateChangeObserver = new WebKitMutationObserver(function(mutations, observer) {
      sendStateThrottled();
    });
  } else {
    this.stateChangeObserver = new WebKitMutationObserver(function(mutations, observer) {
      sendState();
    });
  }
};

BasicController.prototype.doc = function() {
  return (this.frameSelector) ? document.querySelector(this.frameSelector).contentWindow.document : document;
}

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
    if (this.useLazyObserving) {
      if (this[observedKeys[i]] && !this.doc().querySelector(this[observedKeys[i]])) {
        console.log("Waiting for element: ", this[observedKeys[i]])
        return false;
      }
    }
  }
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
  var el = this.doc().querySelector(key);
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
  this.fireEvent(this.doc().querySelector(qs), 'click');
}

BasicController.prototype.querySelectorText = function(qs) {
  var div = this.doc().querySelector(qs);
  if (!div) return null;
  return div.innerText || div.textContent;
}

BasicController.prototype.querySelectorContainsClass = function(qs, clazz) {
  var div = this.doc().querySelector(qs);
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
    var img = this.doc().querySelector(this.artworkImageSelector);
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
  if (this.isThumbsUpSelector) state.thumbsUp = !!this.doc().querySelector(this.isThumbsUpSelector);
  if (this.isThumbsDownSelector) state.thumbsDown = !!this.doc().querySelector(this.isThumbsDownSelector);
  if (this.isFavoriteSelector) state.favorite = !!this.doc().querySelector(this.isFavoriteSelector);
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

BasicController.prototype.throttle = function(fn, threshhold, scope) {
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
