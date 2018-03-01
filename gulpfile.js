var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();

var paths = {
  sass: ['./resources/scss/**/*.scss'],
  main: ['./resources/scss/main.scss']
};

gulp.task('sass', function(done) {
  gulp.src('./resources/scss/main.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./assets/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.main, ['sass']);
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('live-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['sass', 'watch', 'serve'], function () {
    gulp.watch("*.html", ['live-reload']);
    gulp.watch("assets/css/*.css", ['live-reload']);
});
