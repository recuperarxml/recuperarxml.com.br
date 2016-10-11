var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    less = require('gulp-less'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
    //jshint = require('gulp-jshint'),
    //jshintStylish = require('jshint-stylish'),
    //csslint = require('gulp-csslint');

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
              'google9593787cc7c11ddd.html'
             ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

// min assinaturas
gulp.task('minAssinatura', ['minHTML'], function() {
    return gulp.src(['assinatura/index.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/assinatura'));
});

// min boleto
gulp.task('minBoleto', ['minAssinatura'], function() {
    return gulp.src(['boleto/index.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/boleto'));
});

// min js
gulp.task('minJS', ['minBoleto'], function() {
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

// Browser Sync
gulp.task('server', function() {
    browserSync.init({
        server: {
          baseDir: './'
        }
    });
  gulp.watch(['index.html', 
              'assinatura/index.html',
              'boleto/index.html',
              'assets/js/**/*.js', 
              'assets/css/**/*.less']).on('change', reload);


  gulp.watch('assets/js/**/*.js').on('change', function(event) {
      console.log("Linting " + event.path);
      gulp.src(event.path)
          .pipe(jshint())
          .pipe(jshint.reporter(jshintStylish));
  });

  gulp.watch('assets/css/**/*.css').on('change', function(event) {
      console.log("Linting " + event.path);
      gulp.src(event.path)
          .pipe(csslint())
          .pipe(csslint.reporter());
  });      
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(['index.html', 
              'assinatura/index.html',
              'boleto/index.html',
              'assets/js/**/*.js', 
              'assets/css/**/*.less'], ['rx']);

});

// Default task
gulp.task('default', ['watch','rx']);
