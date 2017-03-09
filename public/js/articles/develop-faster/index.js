// Load in our dependencies
var domready = require('../domready');
var Player = require('./player');
var initScreencast = require('./init-screencast');
var gruntScreencast = require('./grunt-screencast');
var nodemonScreencast = require('./nodemon-screencast');
var livereloadScreencast = require('./livereload-screencast');
var watchScreencast = require('./watch-screencast');
var autocorrectScreencast = require('./autocorrect-screencast');

// When the DOM is ready, bind our screencasts
domready(function () {
  var initScreencastPlayer = new Player(initScreencast, 'public/images/articles/develop-faster/init-screencast/');
  document.getElementById('init-screencast').appendChild(initScreencastPlayer.element);
  initScreencastPlayer.start();

  var gruntScreencastPlayer = new Player(gruntScreencast, 'public/images/articles/develop-faster/grunt-screencast/');
  document.getElementById('grunt-screencast').appendChild(gruntScreencastPlayer.element);
  gruntScreencastPlayer.start();

  var nodemonScreencastPlayer = new Player(nodemonScreencast, 'public/images/articles/develop-faster/nodemon-screencast/');
  document.getElementById('nodemon-screencast').appendChild(nodemonScreencastPlayer.element);
  nodemonScreencastPlayer.start();

  var livereloadScreencastPlayer = new Player(livereloadScreencast, 'public/images/articles/develop-faster/livereload-screencast/');
  document.getElementById('livereload-screencast').appendChild(livereloadScreencastPlayer.element);
  livereloadScreencastPlayer.start();

  var watchScreencastPlayer = new Player(watchScreencast, 'public/images/articles/develop-faster/watch-screencast/');
  document.getElementById('watch-screencast').appendChild(watchScreencastPlayer.element);
  watchScreencastPlayer.start();

  var autocorrectScreencastPlayer = new Player(autocorrectScreencast, 'public/images/articles/develop-faster/autocorrect-screencast/');
  document.getElementById('autocorrect-screencast').appendChild(autocorrectScreencastPlayer.element);
  autocorrectScreencastPlayer.start();
});
