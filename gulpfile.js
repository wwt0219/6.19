var gulp = require('gulp');
var server = require('webserver');
var sass = require('gulp-sass');
var uglify = require('uglify');
var autoprefixer = require('gulp-autoprefixer');
var minCss = require('gulp-clean-css');
var path = require('path');
var fs = require('fs');
var url = require('url');
var data = require('./data/data.json');
var sequence = require('gulp-sequence');
gulp.task('server', function() {
    gulp.src('src')
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
// gulp.task('devSass', function() {

// })