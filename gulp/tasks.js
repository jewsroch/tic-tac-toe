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
  prefix = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-minify-css');

// Development Dependencies
var jshint = require('gulp-jshint');
// var browserSync = require('browser-sync');
// var reload = browserSync.reload

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

// Lint
gulp.task('lint-client', function() {
  return gulp.src('./client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// gulp.task('lint-test', function() {
//   return gulp.src('./test/**/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });

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


// gulp.task('browserify-test', ['lint-test'], function() {
//   var browserified = transform(function(filename) {
//     var b = browserify({
//       entries: filename,
//       debug: true
//     });
//     return b.bundle();
//   });

//   return gulp.src('test/client/index.js')
//     .pipe(browserified)
//     .pipe(rename('client-test.js'))
//     .pipe(gulp.dest('build'));
// });


// Styles

gulp.task('styles', function() {
  return gulp.src('./client/stylus/main.styl')
    .pipe(stylus().on('error', notify.onError(function(error) {
      return "Error:" + error.message;
    })))
    .pipe(gulp.dest('public/css'));
});


// Build

gulp.task('minify', ['styles'], function() {
  return gulp.src('public/css/main.css')
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('public/js/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('public/js'));
});



// Test

// gulp.task('test', ['lint-test', 'browserify-test'], function() {
//   return gulp.src('test/client/index.html')
//     .pipe(mochaPhantomjs());
// });

// gulp.task('watch', ['browserSync'], function() {
//   gulp.watch('client/**/*.js', ['browserify-client', 'test']);
//   gulp.watch('test/client/**/*.js', ['test']);
//   gulp.watch('client/**/*.scss', ['styles']);
//   gulp.watch('public/*.html').on('change', reload);
// });



// Tasks
gulp.task('default', ['uglify', 'minify']);
