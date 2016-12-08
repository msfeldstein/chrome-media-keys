'use strict';

/*
See BasicTemplate.js for documentation and an example of a BasicController
*/

class BasicController {
  constructor (params) {
    
    // Settings that are not named here are ignored
    const acceptedSettings = [
      'artistSelector',
      'artworkImageSelector',
      'favoriteSelector',
      'frameSelector',
      'getAlbumArt',
      'getArtist',
      'getTitle',
      'isFavoriteSelector',
      'isPlaying',
      'isThumbsDownSelector',
      'isThumbsUpSelector',
      'nextSelector',
      'nextSong',
      'pause',
      'pauseSelector',
      'play',
      'playPauseSelector',
      'playSelector',
      'playStateClass',
      'playStateSelector',
      'previousSelector',
      'previousSong',
      'supports',
      'test',
      'thumbsDownSelector',
      'thumbsUpSelector',
      'titleSelector',
      'useLazyObserving',
      'watchedElements',
    ];
    
    this.name = document.location.hostname;
    
    // Page has multiple versions
    if (!Array.isArray(params)) {
      params = [params];
    }
    
    let settings;
    
    // Find proper settings
    for (const param of params) {
      // If there is no test, then always use this setting set
      if (param.test && !param.test()) {
        continue;
      }
      
      settings = param;
      
      break;
    }
    
    // Apply settings to controller
    for (const key in settings) {
      if (settings.hasOwnProperty(key) && acceptedSettings.includes(key)) {
        this[key] = typeof settings[key] === 'function' ? settings[key].bind(this) : settings[key];
      }
    }
    
    // Send state
    const sendStateThrottled = settings.doThrottling ? this.throttle(sendState, 250) : sendState;
    
    this.stateChangeObserver = new WebKitMutationObserver(() => sendStateThrottled());
    
    this.document = document;
  }
  
  doc () {
    const iframe = this.frameSelector && document.querySelector(this.frameSelector);
    
    return iframe && iframe.tagName.toLowerCase() === 'iframe' ? iframe.contentWindow.document : document;
  }

  init () {
    const observedKeys = [
      'playStateSelector',
      'titleSelector',
      'artistSelector',
      'artworkImageSelector',
      'thumbsUpSelector',
      'thumbsDownSelector',
      'favoriteSelector'
    ];
    
    this.document = this.doc();
    
    // Warn controller developer when frameSelector fails
    if (this.frameSelector && this.document != document) {
      console.warn("frameSelector is defined but the element is not an IFRAME so it will be ignored.");
    }
    
    for (const key of observedKeys) {
      if (this.useLazyObserving && this[key] && !this.document.querySelector(this[key])) {
        console.info('Waiting for element: ', this[key]);
        
        return false;
      }
      
      this.observeStateChanges(this[key]);
    }
    
    this.watchedElements = this.watchedElements || [];
    this.watchedElements.forEach(element =>  this.observeStateChanges(element));

    return true;
  }
  
  observeStateChanges (key) {
    const el = this.document.querySelector(key);
    
    if (el) {
      this.stateChangeObserver.observe(el, {attributes: true, characterData: true, subtree:true});
    }
  }
  
  fireEvent (element, event, data) {
    const evt = this.document.createEvent("HTMLEvents");
    
    evt.initEvent(event, true, true);
    
    if (data) {
      evt.data = data;
    }
    
    return !element.dispatchEvent(evt);
  }
  
  clickQS (qs) {
    this.fireEvent(this.document.querySelector(qs), 'click');
  }
  
  querySelectorText (qs) {
    const div = this.document.querySelector(qs);
    
    return div && (div.innerText || div.textContent);
  }
  
  querySelectorContainsClass (qs, descendantClass) {
    const div = this.document.querySelector(qs);
    
    return div && (div.classList.contains(descendantClass));
  }
  
  play () {
    let selector;
    
    const isPlaying = this.isPlaying();
    
    if (this.playPauseSelector) {
      selector = this.playPauseSelector;
    } else if (this.playSelector && this.pauseSelector) {
      selector = isPlaying ? this.pauseSelector : this.playSelector;
    }
    
    if (selector) {
      this.clickQS(selector);
      return true;
    }
    
    return false;
  }
  
  nextSong () {
    this.clickQS(this.nextSelector);
  }
  
  previousSong () {
    this.clickQS(this.previousSelector);
  }

  thumbsUp () {
    this.clickQS(this.thumbsUpSelector);
  }

  thumbsDown () {
    this.clickQS(this.thumbsDownSelector);
  }

  favorite () {
    this.clickQS(this.favoriteSelector);
  }

  isPlaying () {
    return this.querySelectorContainsClass(this.playStateSelector, this.playStateClass);
  }

  override (methodName, newMethod) {
    const oldMethod = this[methodName];
    this[methodName] = newMethod.bind(this, oldMethod.bind(this));
  }

  getAlbumArt () {
    if (!this.artworkImageSelector) {
      return undefined;
    }

    const img = this.document.querySelector(this.artworkImageSelector);
    
    return img && img.src;
  }

  getTitle () {
    return this.querySelectorText(this.titleSelector);
  }

  getArtist () {
    return this.querySelectorText(this.artistSelector);
  }

  getState () {
    return {
      title: this.getTitle(),
      artist: this.getArtist(),
      albumArt: this.getAlbumArt(),
      playing: this.isPlaying(),
      service: document.location.host,
      thumbsUp: this.isThumbsUpSelector && !!this.document.querySelector(this.isThumbsUpSelector),
      thumbsDown: this.isThumbsDownSelector && !!this.document.querySelector(this.isThumbsDownSelector),
      favorite: this.isFavoriteSelector && !!this.document.querySelector(this.isFavoriteSelector),
      dontScrobble: this.dontScrobble(),
    };
  }

  dontScrobble () {
    return false;
  }
  
  runInPage (code) {
    const script = document.createElement('script');
    
    script.innerHTML = code;
    document.body.appendChild(script);
    setTimeout(() => document.body.removeChild(script), 1000);
  }

  throttle (fn, threshhold, scope) {
    threshold = threshhold || 250;
    
    let last = 0;
    let deferTimer;
    
    return function () {
      const context = scope || this;
      const now = Date.now();
      const args = arguments;
      
      if (last && now < last + threshhold) {
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
}
