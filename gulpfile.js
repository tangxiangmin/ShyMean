"use strict";

var gulp =  require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch',function () {
   livereload.listen();

   gulp.watch(['./assets/css/*.css','./html/*/*.html','./*.html'],function (file) {
       livereload.changed(file.path);
   })
});
