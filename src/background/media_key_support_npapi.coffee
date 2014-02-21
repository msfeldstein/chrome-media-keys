window.useMediaKeys = () ->
  pluginHolder = document.getElementById('pluginHolder')
  if not pluginHolder
    pluginHolder = document.createElement('div')
    pluginHolder.id = 'pluginHolder';
    document.body.appendChild(pluginHolder);

  plugin = document.getElementById('pluginId')
  if plugin
    return

  embed = document.createElement('object')
  embed.type = 'application/x-unitycontrolplugin'
  embed.id = 'pluginId'
  pluginHolder.appendChild(embed)
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

document.addEventListener('DOMContentLoaded', window.useMediaKeys);