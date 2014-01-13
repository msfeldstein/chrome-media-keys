p = null

useMediaKeys = () ->
  p?.sendMessage({quit:true})
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

document.addEventListener 'DOMContentLoaded', useMediaKeys

window.useMediaKeys = useMediaKeys