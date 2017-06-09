"use strict";

var gulp =  require('gulp');

// 迁移博客
var hexo2mysql = require('hexo2mysql');
gulp.task('hexo2mysql', function () {
	hexo2mysql.transform("_post", 1);
});