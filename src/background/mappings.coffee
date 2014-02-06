window.findScriptByHost = (host) ->
  host = host.toLowerCase()
  script = null
  for name, value of mapping
    if mapping.hasOwnProperty name
      if host.indexOf(name) != -1
        script = value
  if script then "controllers/#{script}" else "controllers/ShimController.js"

mapping =
  'amazon': 'AmazonController.js'
  'audiogalaxy': 'AudiogalaxyController.js'
  'pandora': 'PandoraController.js'
  'di': 'DIController.js'
  'deezer': 'DeezerController.js'
  'grooveshark': 'GroovesharkController.js'
  'bandcamp': 'BandcampController.js'
  'beatsmusic': 'BeatsMusicController.js'
  'earbits': 'EarbitsController.js'
  'getworkdonemusic': 'GetWorkDoneController.js'
  '8tracks': 'EightTracksController.js'
  'play.google': 'GoogleMusicController.js'
  'hypem': 'HypemachineController.js'
  'soundcloud': 'SoundcloudController.js'
  'wearehunted': 'WeAreHuntedController.js'
  'turntable': 'TurntableController.js'
  'songza': 'SongzaController.js'
  'thisismyjam': 'ThisIsMyJamController.js'
  'ex.fm': 'ExfmController.js'
  'jango': 'JangoController.js'
  'last': 'LastfmController.js'
  'iheart': 'iHeartController.js'
  'thesixtyone': 'ThesixtyoneController.js'
  'mog': 'MogController.js'
  'mixcloud': 'MixcloudController.js'
  'napster': 'RhapsodyController.js'
  'playlist': 'PlaylistController.js'
  'rhapsody': 'RhapsodyController.js'
  'rbmaradio': 'RbmaController.js'
  'rdio': 'RdioController.js'
  'saavn': 'SaavnController.js'
  'shuffler': 'ShufflerController.js'
  'slacker': 'SlackerController.js'
  'songdrop': 'SongdropController.js'
  'spotify': 'SpotifyController.js'
  'soundtracker': 'SoundtrackerController.js'
  'twitter': 'TwitterController.js'
  'vk': 'VkController.js'
  'yandex': 'YandexController.js'
  'music.xbox': 'XboxController.js'
  'youtube': 'YoutubeController.js'
  'tracksflow': 'TracksflowController.js'
  'indieshuffle': 'IndieshuffleController.js'
  'stitcher': 'StitcherController.js'