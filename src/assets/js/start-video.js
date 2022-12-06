function startVideo(url) {

    var video,
        player;

    video = document.querySelector('video');
    player = dashjs.MediaPlayer().create();
    player.initialize(video, url, true);
    
}