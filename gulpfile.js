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
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var target = "target";

gulp.task('clean', function(cb){
  rimraf(target, cb);
});

gulp.task('jshint', function(){
  gulp.src('src/*.js')
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('images', function(){
  gulp.src('src/images/*.png')
      .pipe($.imagemin())
      .pipe(gulp.dest(target));
});

gulp.task('scripts', function(){
  gulp.src(['lib/*.js', 'src/*.js'])
      .pipe($.concat('warp.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(target));
});

gulp.task('stylesheets', function(){
  gulp.src(['lib/*.css', 'src/*.css'])
      .pipe($.concat('warp.css'))
      .pipe($.minifyCss())
      .pipe(gulp.dest(target));
});

gulp.task('default', ['scripts', 'stylesheets', 'images']);

gulp.on('err', function (err) {
  throw err;
});