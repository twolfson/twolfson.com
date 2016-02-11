// Load in our dependencies
var gulp = require('gulp');
var gulpCsso = require('gulp-csso');
var gulpSass = require('gulp-sass');
var gulpSizereport = require('gulp-sizereport');
var rimraf = require('rimraf');

// Define our tasks
gulp.task('build-clean', function clean (done) {
  // Remove all compiled files in `dist/`
  rimraf(__dirname + '/dist/', done);
});

gulp.task('build-css', function buildCss () {
  // Generate a stream that compiles SCSS to CSS
  // DEV: We return the pipe'd stream so gulp knows when we exit
  return gulp.src('public/css/index.scss')
    .pipe(gulpSass({
      style: 'nested'
    }))
    .pipe(gulpCsso())
    .pipe(gulpSizereport({gzip: true}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build', ['build-css']);
