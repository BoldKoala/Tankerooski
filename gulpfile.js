// gulpfile.js

// Get gulp packages

var gulp = require('gulp'),
    // gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    // open = require('gulp-open'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    connect = require('gulp-connect-multi')();
    concat = require('gulp-concat');

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
gulp.task('browser-sync', ['scripts','serve'], function(){
  browserSync.init({
    files: ['./**/**/*.*'],
    proxy:'http://localhost:9000',
    port: 9000,
    browser: ['google chrome']
  })
})

gulp.task('scripts', function(){
  return gulp.src([
    './client/lib/angular/angular.min.js',
    './client/lib/angular-ui-router/release/angular-ui-router.min.js',
    './client/lib/angular-resource/angular-resource.min.js',
    './client/lib/angular-cookies/angular-cookies.min.js',
    './client/lib/angular-scrollto/angular-scrollto.min.js',
    './client/lib/parallax/deploy/parallax.min.js',
    './client/lib/famous-angular/dist/famous-angular.min.js',
    './client/lib/famous/dist/famous-global.min.js'
    // './client/lib/jquery/dist/jquery.min.js'
    ])
    .pipe(concat('dependency.js'))
    .pipe(gulp.dest('./client/dist/'));
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