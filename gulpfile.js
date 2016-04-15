var gulp    = require('gulp');
var cssnano = require('gulp-cssnano');
var gutil   = require('gulp-util');
var uglify  = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

gulp.task('rx', function() {
    
    // html
    gulp.src(['index.html',
              'google9593787cc7c11ddd.html',
              'boleto.html'
             ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));

    // js
    gulp.src(['src/js/**/*.js'])
        .pipe(uglify()).pipe(gulp.dest('dist/assets/js'));      
    // css 
    gulp.src('assets/css/**/*.css')
        .pipe(cssnano()).pipe(gulp.dest('dist/assets/css'));
    // copiar
    gulp.src('*.ico')
        .pipe(gulp.dest('dist'));
    gulp.src('assets/img/*.{png,jpg,svg}')
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
