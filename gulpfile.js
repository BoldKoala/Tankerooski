// gulpfile.js

// Get gulp packages

var gulp = require('gulp'),
    // gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    open = require('gulp-open'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon');

// Lint on gulp lint
gulp.task('lint', function() {
  gulp.src('./**/**/*.js')
    .pipe(jshint());
});

// Open local host
gulp.task('url', function(){
  var options = {
    url: 'http://localhost:9000',
    app: 'google-chrome'
  };
  gulp.src('./client')
  .pipe(open('', options));
});

gulp.task('open', function(){
  gulp.src('.client/**/*.html')
  .pipe(open())
})

// Attempt to use browser sync here
// The ultimate goal is to open new browser tab
// http://www.browsersync.io/docs/gulp/

// Run nodemon on gulp serve
gulp.task('serve', function() {
  nodemon({script: 'server/server.js'})
  .on('change', ['lint']);
});