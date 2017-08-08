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
    ftp = require('vinyl-ftp');

// delete ./dist
gulp.task('clearDist', function() {
    return gulp.src('www')
               .pipe(clean())
               .pipe(browserSync.reload({
                    stream: true
                }))
});

// compile LESS
gulp.task('compileLESS', ['clearDist'], function() {
    return gulp.src('assets/css/recuperarxml.less')
               .pipe(less())
               .pipe(gulp.dest('assets/css'))
               .pipe(browserSync.reload({
                    stream: true
                }))
});

// min html
gulp.task('minHTML', ['compileLESS'], function() {
    return gulp.src(['index.html',
              'google9593787cc7c11ddd.html'
             ])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('www'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// min assinaturas
gulp.task('minAssinatura', ['minHTML'], function() {
    return gulp.src(['assinatura/index.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('www/assinatura'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// min boleto
gulp.task('minBoleto', ['minAssinatura'], function() {
    return gulp.src(['boleto/index.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('www/boleto'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// min js
gulp.task('minJS', ['minBoleto'], function() {
    return gulp.src(['assets/js/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('www/assets/js'))              
        .pipe(browserSync.reload({
            stream: true
        }))
});
        
// min css
gulp.task('minCSS', ['minJS'], function() {
    return gulp.src('assets/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('www/assets/css'));
});

// min images
gulp.task('minImages', ['minCSS'], function() {
    return gulp.src('assets/img/**/*')
        //.pipe(imagemin())
        .pipe(gulp.dest('www/assets/img'));
});

// copy others
gulp.task('rx', ['minImages'], function() {

    gulp.src('*.ico')
        .pipe(gulp.dest('www'))
        .pipe(gulp.dest('www/assinatura'))
        .pipe(gulp.dest('www/boleto'))
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
              'assets/js/**/*.js']).on('change', reload);


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

gulp.task('deploy', function () {

    var conn = ftp.create( {
        host: '',
        user: '',
        password: '',
        parallel: 3,
        log: gutil.log
    } );

    var globs = [
        'www/index.html',
		'www/favicon.ico',
		'www/sitemap.xml',
		'www/google9593787cc7c11ddd.html',
		'www/boleto/favicon.ico',
        'www/boleto/index.html',
		'www/assinatura/favicon.ico',
        'www/assinatura/index.html',
        'www/assets/css/**',
        'www/assets/js/**',
		'www/assets/img/**'
    ];

    gulp.src( globs, { base: '.', 
                       buffer: false } )
        .pipe( conn.newer(''))
        .pipe( conn.dest(''))

} );

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
