// gulpfile.js

// Get gulp packages

var gulp = require('gulp'),
    // gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon');

// Lint on gulp lint
gulp.task('lint', function() {
  gulp.src('./**/**/*.js')
    .pipe(jshint())
})

// Run nodemon on gulp serve
gulp.task('serve', function() {
  nodemon({script: 'server/server.js'})
  .on('change', ['lint'])
})