var sync = require('browser-sync');
var gulp = require('gulp');
var sass = require('gulp-sass');

var path = {
  src   : {
    html  : './src/html/*.html',
    scss  : [
      './src/scss/*.scss',
      './src/scss/components/*.scss'
    ]
  },
  build : {
    html  : './build/html',
    css   :  './build/css'
  }
};

gulp.task('browser-sync-accordion', function() {
  return sync({
    server : {
      baseDir : './build',
      index   : 'html/accordion.html',
      notify  : false
    }
  });
});

gulp.task('browser-sync-vertical-tab', function() {
  return sync({
    server : {
      baseDir : './build',
      index   : 'html/vertical-tab.html',
      notify  : false
    }
  });
});

gulp.task('html', function () {
  return gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html))
    .pipe(sync.reload({stream:true}));
});

gulp.task('css', function () {
  return gulp.src(path.src.scss)
    .pipe(sass())
    .pipe(gulp.dest(path.build.css))
    .pipe(sync.reload({stream:true}));
});

gulp.task('watch', function () {
  gulp.watch(path.src.scss, ['css']);
  gulp.watch(path.src.html, ['html']);
});

gulp.task('accordion', ['html', 'css', 'browser-sync-accordion', 'watch']);

gulp.task('vertical-tab', ['html', 'css', 'browser-sync-vertical-tab', 'watch']);
