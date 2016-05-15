var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync','sass', 'watch'], function(){});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        // files: ["client/**/*"],
        port: 9000,
        notify: true
    })
});

gulp.task('nodemon', function(cb) {
    var started = false;

    return nodemon({
        script: 'index.js'
    }).on('start', function() {
        if(!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('sass', function(){
    return gulp
        .src('client/styles/custom.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('client/styles/'))
        .pipe(browserSync.stream());
});

gulp.task('watch',function() {
    gulp.watch('client/styles/custom.scss', ['sass']);
    gulp.watch('client/**/*').on('change', browserSync.reload);
});