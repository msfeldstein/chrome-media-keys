document.addEventListener 'DOMContentLoaded', ->
  chrome.commands.onCommand.addListener (command) ->
    console.log 'Command: ', command
    if command is 'pause'
      sendAction 'pause'
    else if command is 'next'
      sendAction 'next'
    else if command is 'stop'
      sendAction 'stop'
    else if command is 'previous'
      sendAction 'previous'
    else if command is 'thumbsUp'
      sendAction 'thumbsUp'
    else if command is 'thumbsDown'
      sendAction 'thumbsDown'
    else if command is 'favorite'
      sendAction 'favorite'

# They only need to be registered once.
window.useMediaKeys = -> null
