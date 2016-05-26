var gulp     = require('gulp');
var cssnano  = require('gulp-cssnano');
var gutil    = require('gulp-util');
var uglify   = require('gulp-uglify');
var htmlmin  = require('gulp-htmlmin');
var less     = require('gulp-less');
var clean    = require('gulp-clean');
var imagemin = require('gulp-imagemin');

// delete ./dist
gulp.task('clearDist', function() {
    return gulp.src('dist')
               .pipe(clean());
});

// compile LESS
gulp.task('compileLESS', ['clearDist'], function() {
    return gulp.src('assets/css/recuperarxml.less')
               .pipe(less())
               .pipe(gulp.dest('assets/css'));
});

// min html
gulp.task('minHTML', ['compileLESS'], function() {
    return gulp.src(['index.html',
              'google9593787cc7c11ddd.html',
              'boleto.html'
             ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

// min js
gulp.task('minJS', ['minHTML'], function() {
    return gulp.src(['assets/js/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));              
});
        
// min css
gulp.task('minCSS', ['minJS'], function() {
    return gulp.src('assets/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/assets/css'));
});

// min images
gulp.task('minImages', ['minCSS'], function() {
    return gulp.src('assets/img/**/*')
        //.pipe(imagemin())
        .pipe(gulp.dest('dist/assets/img'));
});

// copy others
gulp.task('rx', ['minImages'], function() {

    gulp.src('*.ico')
        .pipe(gulp.dest('dist'));
    gulp.src('assets/css/fonts/*.{eot,svg,ttf,woff}')
        .pipe(gulp.dest('dist/assets/css/fonts'));
    gulp.src('assets/css/less/*.less')
        .pipe(gulp.dest('dist/assets/css/less'));
    gulp.src('assets/css/font-awesome-4.1.0/fonts/*.{otf,eot,svg,ttf,woff}')
        .pipe(gulp.dest('dist/assets/css/font-awesome-4.1.0/fonts'));
    gulp.src('assets/css/font-awesome-4.1.0/less/*.less')
        .pipe(gulp.dest('dist/assets/css/font-awesome-4.1.0/less'));
    gulp.src('assets/css/font-awesome-4.1.0/css/*.css')
        .pipe(cssnano()).pipe(gulp.dest('dist/assets/css/font-awesome-4.1.0/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(['index.html', 
              'assets/js/**/*.js', 
              'assets/css/**/*.less'], ['rx']);
});

// Default task
gulp.task('default', ['watch','rx']);
