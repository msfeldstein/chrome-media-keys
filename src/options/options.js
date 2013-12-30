var bkg = chrome.extension.getBackgroundPage();

var scrobbler = bkg.scrobbler;
console.log(scrobbler)

shouldScrobble = bkg.shouldScrobble();

var activateText = "Scrobble to Last.fm?";
var deactivateText = "Disable Scrobbling";

function checkLoginState() {
  var session = localStorage.getItem("session");
  document.getElementById("lastfm-enable").innerText = session ? deactivateText : activateText;
  if (session) {
    document.getElementById("lastfm-enable").style.display = "";
    document.getElementById("lastfm-loading").style.display = "none";
  } else {
    document.getElementById("lastfm-enable").style.display = "";
    document.getElementById("lastfm-loading").style.display = "none";
  }
}
document.getElementById("lastfm-enable").addEventListener('click', function() {
  if (bkg.shouldScrobble()) {
    bkg.setShouldScrobble(false);
    document.getElementById("lastfm-enable").innerText = activateText;
    return;
  }
  document.getElementById("lastfm-enable").innerText = deactivateText;
  bkg.setShouldScrobble(true);
  document.getElementById("lastfm-enable").style.display = "none";
  document.getElementById("lastfm-loading").style.display = "";
  scrobbler.authenticate(checkLoginState);
});

checkLoginState();

function focused() {
  checkLoginState();
}

chrome.tabs.getCurrent(function(tab) {
  var currentTabId = tab.id;
  chrome.tabs.onActiveChanged.addListener(function(tabId) {
    if (tabId == currentTabId) focused();
  });
})

