'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var through = require('through2');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var minifycss = require('gulp-minify-css');
var cssbeautify = require('gulp-cssbeautify');

// 自动刷新
var livereload = require('gulp-livereload');
var foreach = require('gulp-foreach');
var notify = require("gulp-notify");
var gutil = require('gulp-util');

gulp.task('css', function() {
    return gulp.src('./pages/**/!(_)*.{less,sass,scss}')
    .pipe(plumber({
        errorHandler: handleError
    }))

    // 编译less/scss
    .pipe(foreach(function(stream, file) {
        return stream
            .pipe(path.extname(file.relative) == '.less' ? less() : sass().on('error', sass.logError));
    }))

    // 添加前缀
    .pipe(autoprefixer({
        cascade: false,
        browsers: ['Firefox >= 10', 'iOS >= 4', 'Chrome >= 10']
    }))

    // css样式排序优化，
    .pipe(csscomb())

    // 压缩css
    .pipe(minifycss({
        aggressiveMerging: false,   // 是否暴力合并
        advanced: false,            // 是否开启高级优化
        compatibility: 'ie7',       // 保留ie7写法
        keepBreaks: true            // 是否换行
    }))

    // 将压缩之后css样式还原成为未压缩的状态，因为csscomb排序之后有一些不必要的空行
    .pipe(cssbeautify({
        autosemicolon: true
    }))

    .pipe(gulp.dest('./pages/'))

    .pipe(livereload({
        quiet: true
    }))
    .pipe(notify({
        onLast: true,
        message: "browser reload for css"
    }));
})

// 该任务没有做具体的文件操作，主要目的是在html改变保存时页面会自动刷新
gulp.task('html', function() {
    return gulp.src(['./pages/**/!(_)*.{html,php}', 'index.html'])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(one())
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for html"
        }));
});

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(['./pages/**/*.{html,php}', 'index.html'], ['html']);
    gulp.watch('./pages/**/*.{less,sass,scss}', ['css']);
})

gulp.task('default', ['watch']);

// 错误回调
function handleError(err) {
    gutil.beep();
    gutil.log(err.toString());
    notify.onError("Error: <%= error.message %>")(err);
    this.emit('end');
}


// 合并多个文件流，只执行最后一个
function one(callback) {
    var last;
    return through.obj(function(file, enc, cb) {
        last = file;
        cb();
    }, function(cb) {
        this.push(last);
        callback && callback();
        cb();
    });
}
