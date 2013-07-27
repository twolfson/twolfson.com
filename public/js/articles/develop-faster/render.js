var initScreencastPlayer = new Player(initScreencast, 'public/images/articles/develop-faster/init-screencast/');
document.getElementById('init-screencast').appendChild(initScreencastPlayer.element);
initScreencastPlayer.start();

var livereloadScreencastPlayer = new Player(livereloadScreencast, 'public/images/articles/develop-faster/livereload-screencast/');
document.getElementById('livereload-screencast').appendChild(livereloadScreencastPlayer.element);
livereloadScreencastPlayer.start();

var watchScreencastPlayer = new Player(watchScreencast, 'public/images/articles/develop-faster/watch-screencast/');
document.getElementById('watch-screencast').appendChild(watchScreencastPlayer.element);
watchScreencastPlayer.start();
