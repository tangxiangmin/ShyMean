"use strict";

var gulp =  require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
// livereload({ start: true });

// 迁移博客
var hexo2mysql = require('hexo2mysql');
gulp.task('hexo2mysql', function () {
	hexo2mysql.transform('_posts');
});

// 开发工具
gulp.task('scss',function(){
	gulp.src("./assets/scss/**.**")
		.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest('./assets/css'))
    	.pipe(livereload());
});


// auto
gulp.task('default',function(){
	livereload.listen();
	gulp.watch('./assets/scss/**/**',['scss']);

});