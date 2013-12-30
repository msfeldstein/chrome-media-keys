controller = {
    init: function() {
      if (!document.body) return false;
      var that = this;
      document.body.addEventListener('UnityStateEvent', function(e) {
        that.state = JSON.parse(document.body.getAttribute('data-unity-state'));
        sendState(true);
      });
      document.body.addEventListener('UnitySupportsEvent', function(e) {
        controller.supports = e.detail;
        controller.supports = JSON.parse(document.body.getAttribute('data-unity-supports'));
      });
      this.supports = JSON.parse(document.body.getAttribute('data-unity-supports'));
      this.state = JSON.parse(document.body.getAttribute('data-unity-state')) || {};
      sendState(true);
      return true;
    },
    sendActionEvent: function(action) {
      var evt = document.createEvent("CustomEvent");
      evt.initEvent("UnityActionEvent", true, true );
      evt.detail = action;
      document.body.setAttribute('data-unity-action', JSON.stringify(action));
      document.body.dispatchEvent(evt);
    },
    nextSong: function() {
      this.sendActionEvent('next');
    },
    previousSong: function() {
      this.sendActionEvent('previous');
    },
    play: function() {
      this.sendActionEvent('pause');
    },
    thumbsUp: function() {
      this.sendActionEvent('thumbsUp');
    },
    thumbsDown: function() {
      this.sendActionEvent('thumbsDown');
    },
    favorite: function() {
      this.sendActionEvent('favorite');
    },
    isPlaying: function() {
      return this.state.playing;
    },
    supports: {
      next:true,
      previous:true,
      playpause:true
    },
    getState: function() {
      var state = JSON.parse(document.body.getAttribute('data-unity-state')) || {playing: false};
      return state;
    }
}
