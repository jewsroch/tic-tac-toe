/*jslint node: true */
'use strict';

// Gulp Dependencies
var gulp = require('gulp'),
  rename = require('gulp-rename');

// Build Dependencies
var transform = require('vinyl-transform'),
  browserify = require('browserify'),
  uglify = require('gulp-uglify');

// Style Dependencies
var stylus = require('gulp-stylus'),
  notify = require('gulp-notify'),
  minifyCSS = require('gulp-minify-css');

// Development Dependencies
var jshint = require('gulp-jshint'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

// Lint
gulp.task('lint-client', function() {
  return gulp.src('./client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Browserify
gulp.task('browserify-client', ['lint-client'], function() {
  var browserified = transform(function(filename) {
    var b = browserify({
      entries: filename,
      debug: true
    });
    return b.bundle();
  });

  return gulp.src('client/js/main.js')
    .pipe(browserified)
    .pipe(rename('main.js'))
    .pipe(gulp.dest('public/js'));
});

// Styles
gulp.task('styles', function() {
  return gulp.src('./client/stylus/main.styl')
    .pipe(stylus().on('error', notify.onError(function(error) {
      return "Error:" + error.message;
    })))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Build
gulp.task('minify', ['styles'], function() {
  return gulp.src('public/css/main.css')
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('public/css'));
});

// Uglify
gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('public/js/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Watch
gulp.task('watch', ['browserSync'], function() {
  gulp.watch('client/**/*.js', ['uglify']).on('change', reload);
  gulp.watch('client/**/*.styl', ['styles', 'minify']).on('change', reload);
  gulp.watch('views/*.hbs').on('change', reload);
});

// Tasks
gulp.task('default', ['uglify', 'minify']);
