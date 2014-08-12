document.addEventListener 'DOMContentLoaded', ->
  chrome.commands.onCommand.addListener (command) ->
    console.log 'Command: ', command
    if command is 'pause'
      sendAction 'pause'
    else if command is 'next'
      sendAction 'next'
    else if command is 'previous'
      sendAction 'previous'

# They only need to be registered once.
window.useMediaKeys = -> null
