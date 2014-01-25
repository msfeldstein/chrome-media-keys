window.useMediaKeys = () ->
  plugin = document.getElementById('pluginId')
  if plugin
    document.body.removeChild(plugin);
  embed = document.createElement('object')
  embed.type = 'application/x-unitycontrolplugin'
  embed.id = 'pluginId'
  document.body.appendChild(embed)
  plugin = document.getElementById('pluginId')
  plugin.addEventListener 'next', () ->
    sendAction('next')
  plugin.addEventListener 'previous', () ->
    sendAction('previous')
  plugin.addEventListener 'playPause', () ->
    sendAction('pause')
  plugin.addEventListener 'voteUp', () ->
    sendAction('thumbsUp')
  plugin.addEventListener 'voteDown', () ->
    sendAction('thumbsDown')
  plugin.addEventListener 'getState', () ->
    sendAction("getState");