// Load in our dependencies
var gulp = require('gulp');
var gulpCsso = require('gulp-csso');
var gulpSass = require('gulp-sass');
var gulpLivereload = require('gulp-livereload');
var gulpSizereport = require('gulp-sizereport');
var rimraf = require('rimraf');

// TODO: Make sure that all `/public/*` URLs work (e.g. `960.gridder`)

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

gulp.task('build', ['build-css']);

// Define our development tasks
// Handle a generic forced live reload
gulp.task('livereload-update', function handleLivereloadUpdate () {
  gulpLivereload.reload();
});

// DEV: `['build']` requires that our build task runs once
gulp.task('develop', ['build'], function develop () {
  // Set up our tasks to allow failures
  config.allowFailures = true;
  config.minifyAssets = false;

  // Start a livereload server
  gulpLivereload.listen();

  // When one of our src files changes, re-run its corresponding task
  gulp.watch('article/**/*', ['livereload-update']);
  gulp.watch('public/css/**/*.scss', ['build-css']);
  gulp.watch('server/**/*', ['livereload-update']);
});
