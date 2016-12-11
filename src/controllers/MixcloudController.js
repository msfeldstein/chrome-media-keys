var isBeta = !!document.querySelector('.mz-player-control');

var config = [
  {
    test: () => !isBeta,
    supports: {
      playpause: true,
      previous: true,
      next: true
    },
    playStateSelector: '.player-control',
    playStateClass: 'pause-state',
    playPauseSelector: '.player-control',
    titleSelector: '.player-cloudcast-title',
    artistSelector: '.player-cloudcast-author-link',
    artworkImageSelector: '.player-cloudcast-image img'
  },
  {
    test: () => isBeta,
    supports: {
      playpause: true,
      previous: true,
      next: true
    },
    playStateSelector: '.mz-player-control',
    playStateClass: 'mz-pause-state',
    playPauseSelector: '.mz-player-control',
    titleSelector: '.mz-player-cloudcast-title',
    artistSelector: '.mz-player-cloudcast-author-link',
    artworkImageSelector: '.mz-player-cloudcast-image img'
  }
];

controller = new BasicController(config);

controller.override('getAlbumArt', function(_super) {
  var art = _super();
  return art && art.replace(/\/60\//g, '\/300\/');
});

function mxTriggerEvent(type) {
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent('mxswayEvent', true, true, type);
  document.dispatchEvent(evt);
}

controller.override('nextSong', function() {
  mxTriggerEvent('next');
});

controller.override('previousSong', function() {
  mxTriggerEvent('prev');
});

var actualCode = `
window.mxsway = {
  // const
  SCRUBBER_SELECTOR: '.${isBeta ? 'mz-' : ''}player-scrubber',
  SKIP_TIME: 60, // 1 minute

  // private vars
  entity: null,

  // methods
  scrub: function(type) {
    if (type == 'next' || type == 1) {
      mxsway.moveTo(mxsway.SKIP_TIME);
    } else if (type == 'prev' || type == -1) {
      mxsway.moveTo(mxsway.SKIP_TIME * -1);
    }
  },

  moveTo: function(delta) {
    // micro-singleton
    if (!mxsway.entity) {
      mxsway.entity = $(mxsway.SCRUBBER_SELECTOR).scope();
    }

    var entity = mxsway.entity;

    // setup new time, and check for overflow
    var time = entity.player.audioPosition + delta;

    if (time > entity.player.audioLength) {
      time = entity.player.audioLength;
    } else if (time < 0) {
      time = 0;
    }

    // trigger actual change
    entity.$emit('slider:stop', time);
  }
}

document.addEventListener('mxswayEvent', function (e) {
  mxsway.scrub(e.detail);
});
`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();
