'use strict';

const { series, src, dest } = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
  return src('./less/index.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 1 versions'],
      cascade: false,
      remove: true
    }))
    // .pipe(cssmin())
    .pipe(dest('./lib'));
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

exports.build = series(compile, copyfont);
