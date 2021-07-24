const gulp = require('gulp');
const stylus = require('gulp-stylus');

function styles() {
  return gulp
    .src('./assets/styles/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./assets/styles'));
}

function watch() {
  gulp.watch('./assets/styles/**/*.styl', styles);
}

exports.default = watch;
