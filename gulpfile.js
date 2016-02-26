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
        .pipe(uglify()).pipe(gulp.dest('dist/ext/js'));      
    // css 
    gulp.src('src/css/**/*.css')
        .pipe(cssnano()).pipe(gulp.dest('dist/ext/css'));
    // copiar
    gulp.src('*.ico')
        .pipe(gulp.dest('dist'));
    gulp.src('src/img/*.{png,jpg,svg}')
        .pipe(gulp.dest('dist/ext/img'));
    gulp.src('src/css/fonts/*.{eot,svg,ttf,woff}')
        .pipe(gulp.dest('dist/ext/css/fonts'));
    gulp.src('src/css/less/*.less')
        .pipe(gulp.dest('dist/ext/css/less'));
    gulp.src('src/css/font-awesome-4.1.0/fonts/*.{otf,eot,svg,ttf,woff}')
        .pipe(gulp.dest('dist/ext/css/font-awesome-4.1.0/fonts'));
    gulp.src('src/css/font-awesome-4.1.0/less/*.less')
        .pipe(gulp.dest('dist/ext/css/font-awesome-4.1.0/less'));
    gulp.src('src/css/font-awesome-4.1.0/scss/*.scss')
        .pipe(gulp.dest('dist/ext/css/font-awesome-4.1.0/scss'));
});

// TODO: inserir task para envio ao ftp com vinyl-ftp
