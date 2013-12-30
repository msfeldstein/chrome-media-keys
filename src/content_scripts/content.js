if (window.injected)
  return;
window.injected = true;


var MessageProxy = {
  isChromeExtension: false,
  listeners: [],
  init: function() {
    if (typeof(chrome) !== "undefined"  && chrome.extension) {
      MessageProxy.isChromeExtension = true;
    }
  },
  sendRequest: function(message, callback) {
    if (MessageProxy.isChromeExtension) {
      if (callback)
        chrome.extension.sendRequest(message, callback);
      else
        chrome.extension.sendRequest(message);
    } else {
      sendRequest(message, callback);
    }
  },
  listen: function(callback) {
    if (MessageProxy.isChromeExtension) {
      chrome.extension.onRequest.addListener(callback);
    } else {
      MessageProxy.listeners.push(callback);
    }
  },
  sendCallback: function(request, sender, sendResponse) {
    for (var i = 0; i < MessageProxy.listeners.length; ++i) {
      MessageProxy.listeners[i](request, sender, sendResponse);
    }
  }
};

MessageProxy.init();

function fireEvent(element,event, data){
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent(event, true, true );
  if (data) evt.data = data;
  return!element.dispatchEvent(evt);
}

function innerText(id) {
  var div = document.getElementById(id);
  return div && (div.innerText || div.textContent);
}

function clickById(id) {
  var div = document.getElementById(id);
  fireEvent(div, 'click');
}

function querySelectorText(query) {
  var div = document.querySelector(query);
  return div ? (div.innerText || div.textContent) : "";
}

function innerTextById(id) {
  var div = document.getElementById(id);
  return div ? (div.innerText || div.textContent) : '';
}

function hasClassById(id, className) {
  var div = document.getElementById(id);
  return div ? div.classList.contains(className) : false;
}

function isVisible(el) {
  while(el != document.body){
    if (el.style.display == 'none')
      return false;
    el = el.parentNode;
  }
  return true;
}


function init(){
  var success = false;
  if (controller) {
    success = controller.init();
    if (success) MessageProxy.sendRequest({action: "controller_loaded", host:window.location.host}, function(){});
	  if (!success) setTimeout(init, 500);
  }
}
// Check every 500 ms until the required elements are ready.
// The controller will return true when it was able to pull all the DOM
// elements it needs.  If it returns false it means the page isn't ready
// yet and we should try again until it is.
setTimeout(init,500);

var wasPlaying = false;
var oldState;

// Returns true if the state objects are different.
function didStateChange(newState) {
  if (!oldState) {
    oldState = newState;
    return true;
  }
  var properties = ['favorite', 'playing', 'thumbsUp', 'thumbsDown', 'title', 'artist', 'albumArt', 'domainIcon'];
  var changed = false;
  for (var i = 0; i < properties.length; ++i) {
    if(oldState[properties[i]] != newState[properties[i]]) {
      changed = true;
      break;
    }
  }
  oldState = newState;
  return changed;
}

function domChanged(e) {
  sendState(false);
}

// Send an updated state to the popup. It does a diff between old states and
// new states and wont send anything to the popup if nothings changed, unless
// force is true. 
function sendState(force) {
  var state = controller.getState();
  state.supports = controller.supports;
  state.action = 'newState';
  state.service = controller.name || document.location.hostname;
  if (!wasPlaying && state.playing) {
    MessageProxy.sendRequest({action:'requestFocus'}, function() {});
  }
  wasPlaying = state.playing;
  if (didStateChange(state) || force) {
    MessageProxy.sendRequest(state);
  }
}

// The main controller, populated by the controller injected below.
var controller;
MessageProxy.sendRequest({action:'injectController', host: window.location.host}, function(response) {});

var listener = function(request, sender, sendResponse) {
  if (request.action == "lostFocus") {
    if (controller.lostFocus) {
      controller.lostFocus();
    } else {
      if (request.hostname && request.hostname.indexOf('myspace') != -1 &&
          document.location.hostname.indexOf('myspace') != -1) {
        // Dont pause
      } else {
        if (controller.isPlaying()) controller.play();
      }
    }
  }
	if (request.action == "next") controller.nextSong();
	if (request.action == "thumbsUp") controller.thumbsUp();
	if (request.action == "thumbsDown") controller.thumbsDown();
	if (request.action == "pause") controller.play();
	if (request.action == "previous") controller.previousSong();
	if (request.action == "favorite") controller.favorite();
	if (request.action == "getState") {
	  sendState(true);
  }
	// Always send state after anything changes just to be sure.
	sendState(false);
}

MessageProxy.listen(listener);

// var evt = document.createEvent("CustomEvent");
// evt.initEvent("UnityActionEvent", true, true );
// evt.detail = "enabled";
// document.body.setAttribute('data-unity-action', JSON.stringify("enabled"));
// document.body.dispatchEvent(evt);
// document.body.setAttribute('data-unity-enabled', 'true');
