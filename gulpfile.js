// Load in our dependencies
var assert = require('assert');
var path = require('path');
var _ = require('underscore');
var browserify = require('browserify');
var gulp = require('gulp');
var gulpCsso = require('gulp-csso');
var gulpLivereload = require('gulp-livereload');
var gulpSass = require('gulp-sass')(require('sass'));
var gulpSizereport = require('gulp-sizereport');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpSpritesmith = require('gulp.spritesmith');
var gulpUglify = require('gulp-uglify');
var mergeStream = require('merge-stream');
var rimraf = require('rimraf');
var vinylBuffer = require('vinyl-buffer');
var vinylSourceStream = require('vinyl-source-stream');
var watchify = require('watchify');

// Set up our configuration
var config = {
  allowFailures: false,
  minifyAssets: true
};

// Define our build tasks
exports['build-clean'] = function clean(done) {
  // Remove all compiled files in `dist/`
  rimraf(__dirname + '/dist/', done);
};

// Create a browserify instance
// https://github.com/gulpjs/gulp/blob/v3.9.1/docs/recipes/browserify-uglify-sourcemap.md
// https://github.com/substack/watchify/tree/v3.7.0#watchifyb-opts
var browserifyOptions = {
  cache: {}, packageCache: {},
  debug: true // Enable source maps
};
var browserifyObjs = [
  browserify(_.defaults({
    entries: [__dirname + '/public/js/index.js']
  }, browserifyOptions)),
  browserify(_.defaults({
    entries: [__dirname + '/public/js/articles/develop-faster.js']
  }, browserifyOptions))
];
exports['build-js'] = function buildJs() {
  // Generate a stream for each of our browserify objects
  var jsStreams = browserifyObjs.map(function bundleBrowserifyObj(browserifyObj) {
    // Bundle browserify content
    var jsStream = browserifyObj.bundle();

    // If we are allowing failures, then log them
    if (config.allowFailures) {
      // eslint-disable-next-line no-console
      jsStream.on('error', console.error);
    }

    // Coerce browserify output into a Vinyl object with buffer content
    var entries = browserifyObj._options.entries;
    assert(entries);
    assert.strictEqual(entries.length, 1, 'Expected `browserifyObj` to only have "1" entry ' +
      'but got "' + entries.length + '" entries. Otherwise, we can\'t determine its output name');
    // /home/todd/.../public/js/articles/develop-faster.js -> articles/develop-faster.js
    var jsFilepath = path.relative(__dirname + '/public/js', entries[0]);
    jsStream = jsStream
      .pipe(vinylSourceStream(jsFilepath))
      .pipe(vinylBuffer());

    // Return our JS stream
    return jsStream;
  });

  // Join our files into 1 stream
  // DEV: We use 1 stream so size reports are in the same file
  var jsStream = mergeStream.apply(this, jsStreams);

  // Extract browserify inline sourcemaps into in-memory file
  jsStream = jsStream.pipe(gulpSourcemaps.init({loadMaps: true}));

  // If we are minifying assets, then minify them
  if (config.minifyAssets) {
    jsStream = jsStream
      .pipe(gulpUglify())
      .pipe(gulpSizereport({gzip: true}));
  }

  // Output sourcemaps in-memory to Vinyl file
  jsStream = jsStream.pipe(gulpSourcemaps.write('./'));

  // Return our stream
  return jsStream
    .pipe(gulp.dest('dist/js'))
    .pipe(gulpLivereload());
};

exports['build-css'] = function buildCss() {
  // Generate a stream that compiles SCSS to CSS
  // DEV: We return the pipe'd stream so gulp knows when we exit
  var cssStream = gulp.src('public/css/index.scss')
    .pipe(gulpSass({
      style: 'nested'
    }));

  // If we are allowing failures, then log them
  if (config.allowFailures) {
    // eslint-disable-next-line no-console
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
};

exports.build = gulp.series(exports['build-css'], exports['build-js']);

// Define rarely run build tasks
exports.sprite = function spriteFn(done) {
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
  mergeStream(imgStream, cssStream).on('finish', function handleFinish() {
    // Kick off a CSS task
    // DEV: When `gulp.run` is removed, move to `gulp.series`
    //   https://github.com/gulpjs/gulp/issues/1125
    gulp.run('build-css');

    // Callback
    done();
  });
};

// Define our development tasks
// Handle a generic forced live reload
exports['livereload-update'] = function livereloadUpdate(done) {
  // DEV: Give ourselves a delay to wait for the server to restart
  // TODO: Reduce load time (likely caused by marked and no caching)
  //   Maybe we can figure out a way to not restart upon article change...
  setTimeout(function handleSetTimeout() {
    gulpLivereload.reload();
    done();
  }, 5000);
};

// DEV: `['build']` requires that our build task runs once
exports.develop = gulp.series(exports.build, function develop() {
  // Set up our tasks to allow failures
  config.allowFailures = true;
  config.minifyAssets = false;

  // Start a livereload server
  gulpLivereload.listen();

  // Integrate watchify on browserify
  browserifyObjs.forEach(function bindWatchify(browserifyObj) {
    browserifyObj.plugin(watchify);
    browserifyObj.on('update', function handleUpdate() {
      gulp.series(exports['build-js'])();
    });
    // DEV: Trigger a browserify build to make watchify start watching files
    browserifyObj.bundle().on('data', function () {});
  });

  // When one of our src files changes, re-run its corresponding task
  gulp.watch('articles/**/*', exports['livereload-update']);
  gulp.watch('public/css/**/*.scss', exports['build-css']);
  gulp.watch('server/**/*', exports['livereload-update']);
});
