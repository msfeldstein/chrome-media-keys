p = null

window.useMediaKeys = () ->

  p?.postMessage({quit:true})
  p?.disconnect()
  p = chrome.runtime.connectNative('fm.sway.mediakeys')
  p.onMessage.addListener (msg) ->
    action = msg.action
    if action is 'play'
      sendAction 'pause'
    else if action is 'next'
      sendAction 'next'
    else if action is 'back'
      sendAction 'previous'
  p.onDisconnect.addListener (e) ->
    console.log 'Media Keys Disconnected'
    p = null

document.addEventListener 'DOMContentLoaded', useMediaKeys

window.useMediaKeys = useMediaKeys

window.plugin = {
  requestFocus: () ->
    console.log "REQUEST FOCUS"
    # p.postMessage({requestFocus: true})
}