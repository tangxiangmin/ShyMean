"use strict";

var gulp =  require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch',function () {
   livereload.listen();
   gulp.watch(['assets/**/**','js/**/**','App/**/**'],function (file) {
       livereload.changed(file.path);
   })
});
