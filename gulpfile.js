// gulpfile.js

// Get gulp packages

var gulp = require('gulp'),
    // gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    // open = require('gulp-open'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    connect = require('gulp-connect-multi')();

// Lint on gulp lint
gulp.task('lint', function() {
  gulp.src('./**/**/*.js')
    .pipe(jshint());
});

// Opens up browser
// gulp.task('connect', connect.server({
//   root: ['app'],
//   port: 9000,
//   livereload: true,
//   open: {
//     browser: 'Google Chrome'
//   }
// }));

// Opens up browser, works with 'serve'
gulp.task('browser-sync', ['serve'], function(){
  browserSync.init({
    files: ['./**/**/*.*'],
    proxy:'http://localhost:9000',
    port: 9000,
    browser: ['google chrome']
  })
})

// Run nodemon on gulp serve
gulp.task('serve', function() {
  nodemon({script: 'index.js'})
  .on('change', ['lint']);
});

gulp.task('default', ['browser-sync'], function() {
  // Watch for changes and refresh browser
  gulp.watch('./**/**/*.*', [browserSync.reload]); // Does not seem to work
});