// Load in our dependencies
var assert = require('assert');
var path = require('path');
var _ = require('underscore');
var browserify = require('browserify');
var gulp = require('gulp');
var gulpBuffer = require('gulp-buffer');
var gulpConcat = require('gulp-concat');
var gulpCsso = require('gulp-csso');
var gulpLivereload = require('gulp-livereload');
var gulpSass = require('gulp-sass');
var gulpSizereport = require('gulp-sizereport');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpSpritesmith = require('gulp.spritesmith');
var gulpUglify = require('gulp-uglify');
var mergeStream = require('merge-stream');
var rimraf = require('rimraf');
var vinylSourceStream = require('vinyl-source-stream');
var watchify = require('watchify');

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

  // Initialize source maps
  jsStream = jsStream.pipe(gulpSourcemaps.init());

  // If we are minifying assets, then minify them
  // DEV: This allows us to save time in development
  if (config.minifyAssets) {
    jsStream = jsStream
      .pipe(gulpUglify())
      .pipe(gulpSizereport({gzip: true}));
  }

  // Output sourcemaps in-memory to Vinyl file
  jsStream = jsStream.pipe(gulpSourcemaps.write('./'));

  // Return our stream
  return jsStream
    .pipe(gulp.dest(params.dest))
    .pipe(gulpLivereload());
}

// Create a browserify instance
// https://github.com/gulpjs/gulp/blob/v3.9.1/docs/recipes/browserify-uglify-sourcemap.md
// https://github.com/substack/watchify/tree/v3.7.0#watchifyb-opts
var browserifyOptions = {
  cache: {}, packageCache: {},
  debug: true, // Enable source maps
};
var browserifyObjs = [
  browserify(_.defaults({
    entries: [__dirname + '/public/js/index.js']
  }, browserifyOptions)),
  browserify(_.defaults({
    entries: [__dirname + '/public/js/articles/develop-faster.js']
  }, browserifyOptions))
];
gulp.task('build-js', function () {
  // Generate a stream for each of our browserify objects
  var jsStreams = browserifyObjs.map(
      function bundleBrowserifyObj (browserifyObj) {
    // Bundle browserify content
    var jsStream = browserifyObj.bundle();

    // If we are allowing failures, then log them
    if (config.allowFailures) {
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
      .pipe(gulpBuffer());

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
});

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

  // Integrate watchify on browserify
  browserifyObjs.forEach(function bindWatchify (browserifyObj) {
    browserifyObj.plugin(watchify);
    browserifyObj.on('update', function handleUpdate () {
      // DEV: At some point `gulp.run` will be deprecated, move to `gulp.series` when it does
      gulp.run('build-js');
    });
    // DEV: Trigger a browserify build to make watchify start watching files
    browserifyObj.bundle().on('data', function () {});
  });

  // When one of our src files changes, re-run its corresponding task
  gulp.watch('articles/**/*', ['livereload-update']);
  gulp.watch('public/css/**/*.scss', ['build-css']);
  gulp.watch('server/**/*', ['livereload-update']);
});
