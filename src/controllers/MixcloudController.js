const isOldPlayer = () => !!document.querySelector('.player-control');
const isNewPlayer = () => !!document.querySelector('.mz-player-control');

const config = [
  {
    test: isOldPlayer,
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
    test: isNewPlayer,
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
  let art = _super();
  return art && art.replace(/\/60\//g, '\/300\/')
                   .replace(/\/60x60\//g, '\/300x300\/');
});

const CUSTOM_EVENT_TYPE = 'mxswayEvent';
function mxTriggerEvent(type) {
  const event = new CustomEvent(CUSTOM_EVENT_TYPE, { detail: type });
  document.dispatchEvent(event);
}

controller.override('nextSong', function() {
  mxTriggerEvent('next');
});

controller.override('previousSong', function() {
  mxTriggerEvent('prev');
});

const scrubbingCode = `
(function() {
  const SCRUBBER_SELECTOR_OLD = '.player-scrubber';
  const SCRUBBER_SELECTOR_NEW = '.mz-player-scrubber';
  const SKIP_TIME = 60; // 1 minute

  const getScrubberScope = (function() {
    let scope;

    return function() {
      if (!scope) {
        let $scrubber = $(SCRUBBER_SELECTOR_OLD);
        $scrubber = ($scrubber.length > 0) ? $scrubber : $(SCRUBBER_SELECTOR_NEW);
        scope = $scrubber.scope();
      }

      return scope;
    };
  })();

  function scrub(type) {
    const delta = type === 'next' ? SKIP_TIME : -SKIP_TIME;
    moveScrubber(delta);
  }

  function getNewPosition(delta) {
    const { audioPosition, audioLength } = getScrubberScope().player;

    // setup new time, and check for overflow
    let position = audioPosition + delta;

    if (position > audioLength) {
      position = audioLength;
    } else if (position < 0) {
      position = 0;
    }

    return position;
  }

  function moveScrubber(delta) {
    getScrubberScope().$emit('slider:stop', getNewPosition(delta));
  }

  document.addEventListener('${CUSTOM_EVENT_TYPE}', function ({ detail: type }) {
    scrub(type);
  });
}());
`;

controller.runInPage(scrubbingCode);
