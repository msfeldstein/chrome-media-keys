bkg = chrome.extension.getBackgroundPage()

scrobbler = bkg.scrobbler;

activateText = "Scrobble to Last.fm?";
deactivateText = "Disable Scrobbling";

checkLoginState = () ->
  session = localStorage.getItem("session")
  document.getElementById("lastfm-enable").innerText = if session then deactivateText else activateText
  if session
    document.getElementById("lastfm-enable").style.display = "";
    document.getElementById("lastfm-loading").style.display = "none";
  else
    document.getElementById("lastfm-enable").style.display = "";
    document.getElementById("lastfm-loading").style.display = "none";

document.getElementById("lastfm-enable").addEventListener 'click', () ->
  if bkg.shouldScrobble()
    bkg.setShouldScrobble(false)
    document.getElementById("lastfm-enable").innerText = activateText
    return
  document.getElementById("lastfm-enable").innerText = deactivateText
  bkg.setShouldScrobble(true)
  document.getElementById("lastfm-enable").style.display = "none"
  document.getElementById("lastfm-loading").style.display = ""
  scrobbler.authenticate(checkLoginState)

checkLoginState();

focused = () ->
  checkLoginState();

chrome.tabs.getCurrent (tab) ->
  currentTabId = tab.id
  chrome.tabs.onActiveChanged.addListener (tabId) ->
    if tabId is currentTabId then focused()
allSet = () ->
  before = document.querySelector("#before")
  before.style.display = "none"
  after = document.querySelector("#after")
  after.style.display = ""
  document.querySelector(".alert").classList.add("success")


# Don't do this until we are using native messaging
# attempts = 0
# mediaKeyTimer = 0
# # There's gotta be a better way to check if it's installed than just catching errors
# checkMediaKeys = () ->
#   if attempts is 0
#     document.querySelector(".alert").style.display = "none"
#   else
#     document.querySelector(".alert").style.display = "block"
#   attempts = attempts + 1
#   p = chrome.runtime.connectNative('fm.sway.mediakeys')
#   p.onMessage.addListener (msg) ->
#     allSet()
#     clearTimeout mediaKeyTimer
#   timeout = if attempts is 0 then 1 else 1000
#   mediaKeyTimer = setTimeout checkMediaKeys, timeout

# checkMediaKeys()
  
