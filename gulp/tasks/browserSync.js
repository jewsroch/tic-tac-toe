/*jslint node: true */
'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var config = require('../config').browserSync;
var nodemon = require('gulp-nodemon');
var BROWSER_SYNC_RELOAD_DELAY = 500;

// BrowserSync
gulp.task('browserSync', ['nodemon'], function() {
  browserSync(config);
});

// Nodemon Reloader
gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({
      script: 'bin/www',
      watch: ['app.js', 'controllers/*.js', 'routes/*.js']
    })
    .on('start', function onStart() {
      if (!called) {
        cb();
      }
      called = true;
    })
    .on('restart', function onRestart() {
      setTimeout(function reload() {
        browserSync.reload({
          stream: false //
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});
