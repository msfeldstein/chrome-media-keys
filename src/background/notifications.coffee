NOTIFY_DELAY = 2000
NOTIFY_IDENT = 'song-change'
STORAGE_PATH = 'notifications-enabled'

window.setNotificationsEnabled = (enabled) ->
  localStorage.setItem(STORAGE_PATH, enabled)

window.isNotificationsEnabled = ->
  data = localStorage.getItem(STORAGE_PATH)
  data && JSON.parse(data)

# Main notification handler
window.notifyJob =
  schedule: (id) ->
    notifyCallback = -> 
      window.notifyJob.sent = true
      sendAction('getState')
    
    window.notifyJob.reset()
    window.notifyJob.id = id
    window.notifyJob.callbackId = setTimeout notifyCallback, NOTIFY_DELAY

  flush: (options) ->
    window.notifyJob.reset()
    chrome.notifications.create NOTIFY_IDENT, options
  
  reset: ->
    clearTimeout(window.notifyJob.callbackId) if window.notifyJob.callbackId
    window.notifyJob.sent = false
    window.notifyJob.callbackId = undefined
    window.notifyJob.playing = false

# Sends chrome notifications, but with delay 2 seconds to load
# proper album art
addStateListener (state) ->
  if isNotificationsEnabled()
    id = state.artist + state.title
    
    if (id isnt window.notifyJob.id) or (not window.notifyJob.playing and state.playing)
      # Schedule next notification
      window.notifyJob.schedule id
    else if window.notifyJob.sent
      # 2 seconds passed, show scheduled notification
      window.notifyJob.flush
        type: 'basic',
        iconUrl: state.albumArt,
        title: state.title,
        message: state.artist
  
  # Save playing state in case of play/pause events
  window.notifyJob.playing = state.playing

