// Load in our dependencies
var assert = require('assert');
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpCsso = require('gulp-csso');
var gulpLivereload = require('gulp-livereload');
var gulpSass = require('gulp-sass');
var gulpSizereport = require('gulp-sizereport');
var gulpSpritesmith = require('gulp.spritesmith');
var gulpUglify = require('gulp-uglify');
var rimraf = require('rimraf');
var mergeStream = require('merge-stream');

// Set up our configuration
var config = {
  allowFailures: false,
  minifyAssets: true
};

// Define our build tasks
gulp.task('build-clean', function clean (done) {
  // Remove all compiled files in `dist/`
  rimraf(__dirname + '/dist/', done);
});

function buildJs(params) {
  // Concatenate our content together
  assert(params.src);
  assert(params.compiledName);
  assert(params.dest);
  var jsStream = gulp.src(params.src)
    .pipe(gulpConcat(params.compiledName));

  // If we are allowing failures, then log them
  if (config.allowFailures) {
    jsStream.on('error', console.error);
  }

  // If we are minifying assets, then minify them
  // DEV: This allows us to save time in development
  if (config.minifyAssets) {
    jsStream = jsStream
      .pipe(gulpUglify())
      .pipe(gulpSizereport({gzip: true}));
  }

  // Return our stream
  return jsStream
    .pipe(gulp.dest(params.dest))
    .pipe(gulpLivereload());
}

var mainJsSrc = 'public/js/{' + ['ready', 'highlight', 'gator', 'gator-legacy', 'main'].join(',') + '}.js';
gulp.task('build-main-js', function () {
  return buildJs({
    src: mainJsSrc,
    dest: 'dist/js',
    compiledName: 'index.js'
  });
});

var developFasterJsSrc = 'public/js/articles/develop-faster/{' + [
  'player', 'init-screencast', 'grunt-screencast',
  'nodemon-screencast', 'livereload-screencast',
  'watch-screencast', 'autocorrect-screencast', 'render'
].join(',') + '}.js';
gulp.task('build-develop-faster-js', function () {
  return buildJs({
    src: developFasterJsSrc,
    dest: 'dist/js/articles',
    compiledName: 'develop-faster.js'
  });
});

gulp.task('build-js', ['build-main-js', 'build-develop-faster-js']);

gulp.task('build-css', function buildCss () {
  // Generate a stream that compiles SCSS to CSS
  // DEV: We return the pipe'd stream so gulp knows when we exit
  var cssStream = gulp.src('public/css/index.scss')
    .pipe(gulpSass({
      style: 'nested'
    }));

  // If we are allowing failures, then log them
  if (config.allowFailures) {
    cssStream.on('error', console.error);
  }

  // If we are minifying assets, then minify them
  if (config.minifyAssets) {
    cssStream = cssStream
      .pipe(gulpCsso())
      .pipe(gulpSizereport({gzip: true}));
  }

  // Output our CSS and notify LiveReload
  return cssStream
    .pipe(gulp.dest('dist/css'))
    .pipe(gulpLivereload());
});

gulp.task('build', ['build-css', 'build-js']);

// Define rarely run build tasks
gulp.task('sprite', function spriteFn (done) {
  // Generate our spritesheet
  var spriteData = gulp.src('public/images/sprites/*.png')
    .pipe(gulpSpritesmith({
      retinaSrcFilter: 'public/images/sprites/*-2x.png',

      imgName: 'sprites.png',
      retinaImgName: 'sprites-2x.png',
      imgPath: '../images/sprites.png',
      retinaImgPath: '../images/sprites-2x.png',

      cssName: 'sprites-auto.scss',
      algorithm: 'alt-diagonal'
    }));

  // Output image stream and CSS stream to their respective folders
  var imgStream = spriteData.img
    .pipe(gulp.dest('public/images/'));
  var cssStream = spriteData.css
    .pipe(gulp.dest('public/css/base/'));

  // When both streams are finished
  mergeStream(imgStream, cssStream).on('finish', function handleFinish () {
    // Kick off a CSS task
    // DEV: When `gulp.run` is removed, move to `gulp.series`
    //   https://github.com/gulpjs/gulp/issues/1125
    gulp.run('build-css');

    // Callback
    done();
  });
});

// Define our development tasks
// Handle a generic forced live reload
gulp.task('livereload-update', function handleLivereloadUpdate (done) {
  // DEV: Give ourselves a delay to wait for the server to restart
  // TODO: Reduce load time (likely caused by marked and no caching)
  //   Maybe we can figure out a way to not restart upon article change...
  setTimeout(function handleSetTimeout () {
    gulpLivereload.reload();
    done();
  }, 5000);
});

// DEV: `['build']` requires that our build task runs once
gulp.task('develop', ['build'], function develop () {
  // Set up our tasks to allow failures
  config.allowFailures = true;
  config.minifyAssets = false;

  // Start a livereload server
  gulpLivereload.listen();

  // When one of our src files changes, re-run its corresponding task
  gulp.watch('articles/**/*', ['livereload-update']);
  gulp.watch('public/css/**/*.scss', ['build-css']);
  gulp.watch(mainJsSrc, ['build-main-js']);
  gulp.watch(developFasterJsSrc, ['build-develop-faster-js']);
  gulp.watch('server/**/*', ['livereload-update']);
});
