if window.injected then return
window.injected = true;
noop = (()->)

window.fireEvent = (element, event, data) ->
  evt = document.createEvent("HTMLEvents")
  evt.initEvent(event, true, true)
  if data then evt.data = data
  !element.dispatchEvent(evt)

window.innerText = (id) ->
  document.getElementById(id)?.textContent

window.clickById = (id) ->
  div = document.getElementById(id)
  fireEvent(div, 'click')

window.clickBySelector = (selector) ->
  element = document.querySelector(selector)
  fireEvent(element, 'click')

window.querySelectorText = (query) ->
  document.querySelector(query)?.textContent or ""

window.innerTextById = (id) ->
  div = document.getElementById(id);
  div?.textContent || ""

window.hasClassById = (id, className) ->
  div = document.getElementById(id);
  div?.classList.contains(className) or false

window.isVisible = (el) ->
  while el != document.body
    if el.style.display == 'none'
      return false;
    el = el.parentNode;
  return true;

initIfReady = () ->
  # If `controller` is not defined, that means the relevant
  # controller script hasn't finished being injected and
  # executing yet (this is controlled by the background script).

  # `controller.init` will return true when it was able to pull
  # all the DOM elements it needs. If it returns false it means
  # the page isn't ready yet.

  if controller? and controller.init()
    chrome.extension.sendRequest(
      {
        action: "controller_loaded",
        host: window.location.host
      },
      noop
    )
  else
    # Check every 500 ms until `controller` is defined and the
    # required elements are ready.
    setTimeout initIfReady, 500

initIfReady()

wasPlaying = false
oldState = null

# Returns true if the state objects are different.
didStateChange = (newState) ->
  if not oldState
    oldState = newState;
    return true;
  properties = ['favorite', 'playing', 'thumbsUp', 'thumbsDown', 'title', 'artist', 'albumArt', 'domainIcon']
  changed = false
  for property in properties
    if oldState[property] isnt newState[property]
      changed = true
      break
  oldState = newState;
  changed

# Send an updated state to the popup. It does a diff between old states and
# new states and wont send anything to the popup if nothings changed, unless
# force is true. 
window.sendState = (force) ->
  state = controller.getState()
  state.supports = controller.supports
  state.action = 'newState'
  state.service = controller.name or document.location.hostname
  if not wasPlaying and state.playing
    chrome.extension.sendRequest({action:'requestFocus'}, noop)
  wasPlaying = state.playing
  if didStateChange(state) or force
    chrome.extension.sendRequest(state, noop);

# Inject the specific music controller into the page.
# Check for plex since it runs on various domains and IPs
if document.querySelector("#plex.application")
  chrome.extension.sendRequest({action:'injectController', host: "plex"}, noop);
else
  chrome.extension.sendRequest({action:'injectController', host: window.location.host}, noop);

listener = (request, sender, sendResponse) ->
  if request.action is "lostFocus"
    if controller.lostFocus
      controller.lostFocus()
    else
      if request.hostname && request.hostname.indexOf('myspace') != -1 && document.location.hostname.indexOf('myspace') != -1
        # Dont pause multiple myspace players
        "Do nothing"
      else
        if (controller.isPlaying()) then controller.play()
  if request.action is "next" then controller.nextSong()
  if (request.action is "thumbsUp" && controller.supports.thumbsUp) then controller.thumbsUp()
  if (request.action is "thumbsDown" && controller.supports.thumbsDown) then controller.thumbsDown()
  if request.action is "pause" then controller.play()
  if (request.action is "stop" && controller.isPlaying()) then controller.play()
  if request.action is "previous" then controller.previousSong()
  if (request.action is "favorite" && controller.supports.favorite) then controller.favorite()
  if request.action is "getState"
    sendState(true)
  else
    # Always send state after anything changes just to be sure.
    sendState(false);

chrome.extension.onRequest.addListener listener

  
