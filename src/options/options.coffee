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

document.querySelector(".dogecoin-button").addEventListener 'click', () ->
  alert("Send dogecoin donations to 9zQ9UjtPGoqhwRVAgUmq2wJr8EDMtPK5Ge")

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

youtubeBox = document.querySelector("#ignore-youtube-checkbox")
if localStorage.getItem("ignore-youtube")
  youtubeBox.checked = true
youtubeBox.addEventListener "change", () ->
  localStorage.setItem("ignore-youtube", youtubeBox.checked)
