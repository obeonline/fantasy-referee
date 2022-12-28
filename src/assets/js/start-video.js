function startVideo(url) {

  var options = {"responsive": true};

    var player = videojs('replay-player', options, function onPlayerReady() {
    videojs.log('Your player is ready!');

    // In this context, `this` is the player that was created by Video.js.
    this.playsinline(true);
    this.src({
      type: 'application/x-mpegURL',
      src: url
    });

    this.play();
  });

}

function disposeVideoPlayer() {
  var player = videojs('replay-player');
  player.dispose();

  console.log("Disposed of video player.")
}
