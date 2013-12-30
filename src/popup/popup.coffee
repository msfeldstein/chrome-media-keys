# Tab ID of the currently playing tab. Used to
# filter out updates from background non-playing tabs.
tabId = null

$ = (qs) ->
  document.querySelector(qs)

sendRequest = (action) ->
  chrome.extension.sendRequest({action: action}, (()->))

chrome.extension.sendRequest {action: "getTabId"}, (response) ->
  tabId = response.tabId

document.addEventListener "keydown", (e) ->
  if e.keyCode is 32
    sendRequest "pause"
  else if e.keyCode is 37
    sendRequest "previous"
  else if e.keyCode is 39
    sendRequest "next"

setClass = (el, className, show) ->
  if show then el.classList.add(className) else el.classList.remove(className)

shouldShow = (qs, should) ->
  $(qs).style.display = if should then "block" else "none"

updateUI = (uiState) ->
  # Populate the UI with new player state values
  $("#song-name").textContent = uiState.title
  $("#artist-name").textContent = uiState.artist
  $("#album-art").src = uiState.albumArt

  setClass document.body, "playing", uiState.playing
  setClass $("#thumbs-up"), "toggled", uiState.thumbsUp
  setClass $("#thumbs-down"), "toggled", uiState.thumbsDown
  setClass $("#favorite"), "toggled", uiState.favorite

  support = uiState.supports
  shouldShow "#play-pause", support.playpause
  shouldShow "#next", support.next
  shouldShow "#previous", support.previous
  shouldShow "#thumbs-up", support.thumbsUp
  shouldShow "#thumbs-down", support.thumbsDown

  $("#header").classList.remove "no-music"
  $("#not-playing-container").style.display = "none"
  $("#art-holder").style.display = ""

chrome.extension.onRequest.addListener (request, sender, sendResponse) ->
  if request.action is "requestFocus"
    tabId = sender.tab.id
  if (request.action is "newState" and sender.tab and sender.tab.id == tabId)
    updateUI request

bindClickToAction = (divId, action) ->
  $(divId).addEventListener "click", () ->
    sendRequest action

load = () ->
  bindClickToAction "#thumbs-down", "thumbsDown"
  bindClickToAction "#thumbs-up", "thumbsUp"
  bindClickToAction "#favorite", "favorite"
  bindClickToAction "#previous", "previous"
  bindClickToAction "#play-pause", "pause"
  bindClickToAction "#next", "next"
  bindClickToAction "#song-details", "focus"
  bindClickToAction "#album-art", "focus"
document.addEventListener "DOMContentLoaded", load, false

convertCTAToShare = () ->
  html = 'Share this url: <input id="shareUrl" style="width: 120px; font-size: 15px; height: 20px;" type="text" value="https://chrome.google.com/webstore/detail/swayfm-unified-music-medi/icckhjgjjompfgoiidainoapgjepncej?hl=en-US" /> <a href="http://twitter.com/home?status=Love%20the%20@swayfm%20extension!%20(Play/pause%20streaming%20music%20using%20media%20keys)%20http://goo.gl/8TiDKH" target="_blank"><img class="share-img" src="images/share-buttons/twitter.png"></a> <a href="https://www.facebook.com/sharer.php?s=100&p%5Burl%5D=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fswayfm-unified-music-medi%2Ficckhjgjjompfgoiidainoapgjepncej%3Fhl%3Den-US&p%5Bimages%5D%5B0%5D=https%3A%2F%2Flh3.googleusercontent.com%2FY1q2NYND_THaEVgyb--4NedSPUkQjPfV2BpV9FNxQBrk9dnWQMTrBowzBDu1ufqilvtcn8bo%3Dw120-h120&p%5Btitle%5D=Sway.fm%20for%20Chrome&p%5Bsummary%5D=Use%20the%20buttons%20that%20normally%20pause%20iTunes%2C%20to%20play%2Fpause%20any%20music%20playing%20through%20a%20webpage%20in%20Chrome!" target="_blank"><img class="share-img" src="images/share-buttons/facebook.png" /></a> <a href="https://plus.google.com/share?url=https://chrome.google.com/webstore/detail/swayfm-unified-music-medi/icckhjgjjompfgoiidainoapgjepncej?hl=en-US" target="_blank"><img src="images/share-buttons/gplus.png" class="share-img" /></a>'
  $("#sway-cta").innerHTML = html
  $("#share-url").focus()
$("#share-link").onclick = convertCTAToShare

sendRequest "getState"
