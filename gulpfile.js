/*
 * Copyright (c) 2013 - 2014, TRIOLOGY GmbH
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED.  IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * http://www.scm-manager.com
 */


// load gulp
var gulp = require('gulp');
var connect = require('gulp-connect');
var $ = require('gulp-load-plugins')();
var del = require('del');
var target = "target/warp";
var info = require('./package.json');
var sass = require('gulp-sass')(require('sass'));

var config = {
  base64: {
    baseDir: '.tmp'
  },
  autoprefixer: {
    browsers: '> 0%'
  },
  logo: 'node_modules/ces-theme/dist/images/logo/blib-white-160px.png'
};

gulp.task('copyfonts', function() {
  return gulp.src('node_modules/ces-theme/dist/fonts/*.{ttf,woff,eot}')
      .pipe(gulp.dest('.tmp/warp/fonts'))
      .pipe(gulp.dest('target/warp/fonts'));
});

gulp.task('clean', function(done){
  return del(['target', '.tmp']);
});

gulp.task('images', function(){
  return gulp.src(['src/images/*.png', config.logo])
             .pipe($.imagemin())
             .pipe(gulp.dest('.tmp/images'));
});

gulp.task('vectors', function(){
  return gulp.src('src/images/*.svg')
      .pipe(gulp.dest('.tmp/images'));
});

gulp.task('scripts', function(){
  return gulp.src(['src/*.js'])
             .pipe($.concat('warp.js'))
             .pipe($.iife())
             .pipe($.uglify())
             .pipe(gulp.dest(target));
})

gulp.task('stylesheets', gulp.series('images', function(){
  return gulp.src('src/*.scss')
             .pipe(sass())
             .pipe($.autoprefixer(config.autoprefixer))
             .pipe($.concat('warp.css'))
             .pipe($.base64(config.base64))
             .pipe($.minifyCss())
             .pipe(gulp.dest(target));
}));

gulp.task('default', gulp.series('scripts', 'stylesheets', 'images', 'copyfonts', 'vectors'));

gulp.task('release', gulp.series('scripts', 'stylesheets', 'images', function(){
  gulp.src('target/**')
      .pipe($.zip('warp-v' + info.version + '.zip'))
      .pipe(gulp.dest('target/'));
}));

// code quality

gulp.task('jshint', function(done){
  return gulp.src('src/*.js')
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'));
})

gulp.task('csslint', function(done){
  return gulp.src('src/*.css')
      .pipe($.csslint())
      .pipe($.csslint.reporter());
})

gulp.task('lint', gulp.series('jshint', 'csslint'));

// development tasks

gulp.task('webserver', function(done){
  connect.server({
    root: ['sample', '.tmp'],
    livereload: true,
    port: 8000
  });
  done();
});

gulp.task('sample-images', function(){
  return gulp.src(['src/images/*.png', config.logo])
             .pipe($.imagemin())
             .pipe(gulp.dest('.tmp/images'));
});

gulp.task('sample-styles', gulp.series('sample-images', function(){
  return gulp.src(['src/*.scss'])
      .pipe(sass())
      .pipe($.autoprefixer(config.autoprefixer))
      .pipe($.concat('warp.css'))
      .pipe($.base64(config.base64))
      .pipe(gulp.dest('.tmp/warp'));
}));

gulp.task('sample', gulp.series('sample-styles', function(){
  return gulp.src('src/*.js')
      .pipe($.concat('warp.js'))
      .pipe($.iife())
      .pipe(gulp.dest('.tmp/warp'));
}));

gulp.task('reload', function(){
  return gulp.src('sample/index.html')
      .pipe(connect.reload());
});

gulp.task('watch', async function(){
  gulp.watch('src/**', gulp.series('sample'));
  gulp.watch('sample/index.html', gulp.series('reload'));
});

gulp.task('serve', gulp.series('sample', 'webserver', 'copyfonts', 'vectors', 'watch' ));

// error handling

gulp.on('err', function (err) {
  throw err;
});
