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

showShareOptions = (e) ->
  e.preventDefault()
  shouldShow('#sway-cta', no)
  shouldShow('#sway-share', yes)
  $("#share-url").focus()

$("#share-link").onclick = showShareOptions

sendRequest "getState"
