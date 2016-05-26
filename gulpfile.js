var gulp     = require('gulp');
var cssnano  = require('gulp-cssnano');
var gutil    = require('gulp-util');
var uglify   = require('gulp-uglify');
var htmlmin  = require('gulp-htmlmin');
var less     = require('gulp-less');
var imagemin = require('gulp-imagemin');
/*
var imagegif = require('imagemin-gifsicle');
var imagejpg = require('imagemin-jpegtran');
var imagepng = require('imagemin-optipng');
var imagesvg = require('imagemin-svgo');
*/

gulp.task('rx', function() {
    
    // compile LESS
    gulp.src('assets/css/recuperarxml.less')
        .pipe(less())
        .pipe(gulp.dest('assets/css'));

    // html
    gulp.src(['index.html',
              'google9593787cc7c11ddd.html',
              'boleto.html'
             ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));

    // js
    gulp.src(['assets/js/**/*.js'])
        .pipe(uglify()).pipe(gulp.dest('dist/assets/js'));      

    // css 
    gulp.src('assets/css/**/*.css')
        .pipe(cssnano()).pipe(gulp.dest('dist/assets/css'));

    // images
    gulp.src('assets/img/*.{png,jpg,svg,gif}')
        .pipe(imagemin()).pipe(gulp.dest('dist/assets/img'));

    // copy do ./dist
    gulp.src('*.ico')
        .pipe(gulp.dest('dist'));
    gulp.src('assets/img/*.{png,jpg,svg,gif}')
        .pipe(gulp.dest('dist/assets/img'));
    gulp.src('assets/css/fonts/*.{eot,svg,ttf,woff}')
        .pipe(gulp.dest('dist/assets/css/fonts'));
    gulp.src('assets/css/less/*.less')
        .pipe(gulp.dest('dist/assets/css/less'));
    gulp.src('assets/css/font-awesome-4.1.0/fonts/*.{otf,eot,svg,ttf,woff}')
        .pipe(gulp.dest('dist/assets/css/font-awesome-4.1.0/fonts'));
    gulp.src('assets/css/font-awesome-4.1.0/less/*.less')
        .pipe(gulp.dest('dist/assets/css/font-awesome-4.1.0/less'));
    gulp.src('assets/css/font-awesome-4.1.0/scss/*.scss')
        .pipe(gulp.dest('dist/assets/css/font-awesome-4.1.0/scss'));

});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(['index.html', 
              'assets/js/**/*.js', 
              'assets/css/**/*.less'], ['rx']);
});

// Default task
gulp.task('default', ['watch','rx']);