'use strict';

let fs   = require("fs"),
    path = require("path");

let gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    webpack     = require('gulp-webpack'),
    spritesmith = require('gulp.spritesmith'),
    watch       = require("gulp-watch"),
    uglify      = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer');



/* 路径配置 */
const ASSETS_PATH = `./public`;
const STYLE_PATH = ASSETS_PATH + "/scss/**/*.scss";
const SCRIPT_PATH = ASSETS_PATH + "/js";
const SPRITE_PATH = ASSETS_PATH + "/sprite/**/*.png";

const DEST_PATH = `./public`;
const STYLE_DEST_PATH = DEST_PATH + "/css";
const SCRIPT_DEST_PATH = DEST_PATH + "/js";
const SPRITE_DEST_PATH = DEST_PATH + "/css/sprite";


// 样式表
function parseSCSS() {
    return gulp.src(STYLE_PATH)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(STYLE_DEST_PATH));
}

gulp.task('test', function () {
    console.log("Hello gulp test");
});

gulp.task('scss', function () {
    return parseSCSS();
});

gulp.task('scss:w', function () {
    watch(STYLE_PATH, function () {
        return parseSCSS();
    });
});

// 脚本
function parseJS() {
    let PAGE_SCRIPT_PATH = SCRIPT_PATH + "/page";

    return gulp.src(SCRIPT_PATH + "/index.js")
        .pipe(webpack(config.webpack(PAGE_SCRIPT_PATH)))
        .pipe(uglify())
        .pipe(gulp.dest(SCRIPT_DEST_PATH));
}
gulp.task('js', function () {
    parseJS();
});

gulp.task('js:w', function () {
    watch(SCRIPT_PATH + "/**/*.js", function () {
        parseJS();
    });
});

// 精灵图
gulp.task('sprite:parse', function () {
    let spriteData = gulp.src(SPRITE_PATH).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));

    return spriteData.pipe(gulp.dest(SPRITE_DEST_PATH));

});

gulp.task("sprite", ["sprite:parse"], function () {
    function getFile(filename) {
        return path.resolve(SPRITE_DEST_PATH, filename);
    }

    fs.rename(getFile("./sprite.css"), getFile("./sprite.scss"), function (err) {
        if (err) throw err;
    });
    fs.rename(getFile("./sprite.png"), getFile("../sprite.png"), function (err) {
        if (err) throw err;
    });
});
