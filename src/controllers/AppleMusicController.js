controller = new BasicController({
  supports: {
    playpause: true
  },
  playStateSelector: '#pButton',
  playStateClass: 'pause',
  playPauseSelector: '#pButton',
  titleSelector: '.post-title .media-title',
  artistSelector: '.post-title .tint-color.clickable',
  artworkImageSelector: '.track-img img',
});

// if = itunes.apple.com (actual page)
// else = embed.itunes.apple.com OR itunes.apple.com/embedded-player (embedded player in its own tab)

controller.override('getTitle', function() {
	if(this.doc().querySelector(this.titleSelector))
		return this.querySelectorText(this.titleSelector);
	else
		return this.doc().querySelectorAll('.track-title p')[0].innerText;
});

controller.override('getArtist', function() {
	if(this.doc().querySelector(this.artistSelector))
		return this.querySelectorText(this.artistSelector);
	else
		return this.doc().querySelectorAll('.track-title p')[1].innerText;
});

controller.override('getAlbumArt', function() {
	if(this.doc().querySelector(this.artworkImageSelector)) {
		var img = this.doc().querySelector(this.artworkImageSelector);
		return img && img.src;
	} else {
		var img = this.doc().querySelector('.inner.clickable img');
		return img && img.src;
	}
});
