window.findScriptByHost = (host) ->
  if host.indexOf("youtube") != -1 && localStorage.getItem("ignore-youtube") == "true"
    return "controllers/ShimController.js"

  host = host.toLowerCase()
  script = null
  for name, value of mapping
    if mapping.hasOwnProperty name
      if host.indexOf(name) != -1
        script = value
  console.log "Script", script, host
  if script then "controllers/#{script}" else "controllers/ShimController.js"

mapping =
  '163': 'OneSixtyThreeController.js'
  '8tracks': 'EightTracksController.js'
  '99percentinvisible' : 'SCMController.js'
  'amazon': 'AmazonController.js'
  'app.napster': 'NapsterController.js'
  'audible': 'AudibleController.js'
  'audiogalaxy': 'AudiogalaxyController.js'
  'audiomack': 'AudiomackController.js'
  'bandcamp': 'BandcampController.js'
  'bbc': 'BBCRadioPopOutController.js'
  'beatsmusic': 'BeatsMusicController.js'
  'bop': 'BopController.js'
  'bronytunes': 'BronyTunesController.js'
  'connect.monstercat': 'MonstercatController.js'
  'deezer': 'DeezerController.js'
  'di.fm': 'DIController.js'
  'dr.dk': 'DRController.js'
  'earbits': 'EarbitsController.js'
  'ex.fm': 'ExfmController.js'
  'feedly': 'FeedlyController.js'
  'focusatwill': 'FocusAtWillController.js'
  'gaana': 'GaanaController.js'
  'getworkdonemusic': 'GetWorkDoneController.js'
  'gold.monstercat': 'MonstercatController.js'
  'grooveshark': 'GroovesharkController.js'
  'hearthis': 'HearThisController.js'
  'hypem': 'HypemachineController.js'
  'iheart': 'iHeartController.js'
  'indieshuffle': 'IndieshuffleController.js'
  'jango': 'JangoController.js'
  'jing.fm': 'JingfmController.js'
  'last': 'LastfmController.js'
  'license.monstercat': 'MonstercatController.js'
  'mixcloud': 'MixcloudController.js'
  'mixrad': 'NokiaMixradioController.js'
  'mog': 'MogController.js'
  'music.microsoft': 'XboxController.js'  
  'netflix': 'NetflixController.js'
  'noonpacific': 'NoonPacificController.js'
  'one.npr': 'NPROneController.js'
  'overcast': 'OvercastController.js'
  'pandora': 'PandoraController.js'
  'play.google': 'GoogleMusicController.js'
  'player.fm': 'PlayerFMController.js'
  'playlist.com': 'PlaylistController.js'
  'playlist.me': 'SCMController.js'
  'pleer.com': 'PleerController.js'
  'plex': 'PlexController.js'
  'pony.fm': 'PonyFmController.js'
  'ponyvillelive': 'PonyvilleLiveController.js'
  'rbmaradio': 'RbmaController.js'
  'rdio': 'RdioController.js'
  'reddit.music.player.il.ly': 'RedditplayerController.js'
  'reddit.musicplayer.io': 'RedditplayerController.js'
  'rhapsody': 'RhapsodyController.js'
  'saavn': 'SaavnController.js'
  'scmplayer': 'SCMFramelessController.js'
  'shuffler': 'ShufflerController.js'
  'slacker': 'SlackerController.js'
  'songdrop': 'SongdropController.js'
  'songza': 'SongzaController.js'
  'soundcloud': 'SoundcloudController.js'
  'soundtracker': 'SoundtrackerController.js'
  'spotify': 'SpotifyController.js'
  'smule': 'SmuleController.js'
  'stitcher': 'StitcherController.js'
  'sverigesradio': 'SverigesradioController.js'
  'themusicninja': 'TheMusicNinjaController.js'
  'thesixtyone': 'ThesixtyoneController.js'
  'thisismyjam': 'ThisIsMyJamController.js'
  'tracksflow': 'TracksflowController.js'
  'tumblr': 'SCMController.js'
  'tunein': 'TuneinController.js'
  'turntable': 'TurntableController.js'
  'twitter': 'TwitterController.js'
  'vessel': 'VesselController.js'
  'vimeo': 'VimeoController.js'
  'vk': 'VkController.js'
  'wearehunted': 'WeAreHuntedController.js'
  'y.qq': 'QQMusicController.js'
  'radio.yandex': 'YandexRadioController.js'
  'youtube': 'YoutubeController.js'
