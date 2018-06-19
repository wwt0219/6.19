var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var minCss = require('gulp-clean-css');
var path = require('path');
var fs = require('fs');
var url = require('url');
var data = require('./data/data.json');
var sequence = require('gulp-sequence');
gulp.task('server', ['devSass'], function() {
    gulp.src('build')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/list') {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

//开发sass
gulp.task('devSass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
})

//线上css
gulp.task('buildCss', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('build/css'))
})

//压缩js
gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
})
gulp.task('build', function(cb) {
    sequence('devSass', 'buildCss', 'js', 'html', 'server', cb)
})