"use strict";

var gulp =  require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps'); 

var livereload = require('gulp-livereload');
// livereload({ start: true });

// task
gulp.task('scss',function(){
	gulp.src("./assets/scss/*.scss")
		.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest('./assets/css'))
    	.pipe(livereload());
})


// auto
gulp.task('default',function(){
	livereload.listen();
	gulp.watch('./assets/scss/*.scss',['scss']);

})