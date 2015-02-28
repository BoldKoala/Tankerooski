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
    clean = require('gulp-clean');

// Lint on gulp lint
gulp.task('lint', function() {
  gulp.src('./**/**/*.js')
    .pipe(jshint());
});

// Opens up browser, works with 'serve'
gulp.task('browser-sync', ['build','serve'], function(){
  browserSync.init({
    files: ['./**/**/*.*'],
    proxy:'http://localhost:9000',
    port: 9000,
    browser: ['google chrome']
  })
});

gulp.task('clean',function(){
  return gulp.src('./client/dist/*.js', {read: false})
    .pipe(clean());
});


gulp.task('scripts', function(){
  return gulp.src([
    './client/lib/angular/angular.min.js',
    './client/lib/angular-ui-router/release/angular-ui-router.min.js',
    './client/lib/angular-cookies/angular-cookies.min.js',
    './client/lib/famous-angular/dist/famous-angular.min.js',
    './client/lib/famous/dist/famous-global.min.js'
    ])
    .pipe(concat('dependency.js'))
    .pipe(gulp.dest('./client/dist/'));
});

gulp.task('build',['clean','scripts'],function(){
});

// Run nodemon on gulp serve
gulp.task('serve', function() {
  nodemon({script: 'index.js'})
  .on('change', ['lint']);
});

gulp.task('default', ['browser-sync'], function() {
  // Watch for changes and refresh browser
  gulp.watch('./**/**/*.*', [browserSync.reload]); // Does not seem to work
});