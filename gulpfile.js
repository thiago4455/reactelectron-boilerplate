const exec = require('child_process').exec;
const gulp = require('gulp');
const babel = require('gulp-babel');
const css = require('gulp-clean-css');
const livereload = require('gulp-livereload');
const gulpSass = require('gulp-sass')
var inject = require('gulp-inject');

gulp.task('html', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('app/'))
        .pipe(livereload());
});

gulp.task('css', () => {
    return gulp.src('src/**/*.css')
        .pipe(css())
        .pipe(gulp.dest('app/'))
        .pipe(livereload());
});

gulp.task('sass', async function() {
    var sass =  gulp.src('src/**/*.scss', {read: false})
   
    var sassOptions = {
      addRootSlash: false,
      addPrefix: '.',
      transform: function (filepath) {
        return '@import "' + filepath + '";';
      }
    }
   
    gulp.src('app/index.scss')
    .pipe(inject(sass, sassOptions))
    .pipe(gulpSass())
    .pipe(gulp.dest('app/'))
    .pipe(livereload());
  })

gulp.task('js', () => {
    return gulp.src(['main.js', 'src/**/*.js'])
         .pipe(babel())
         .pipe(gulp.dest('app/'))
         .pipe(livereload());
});


gulp.task('jsx', () => {
    return gulp.src(['main.js', 'src/**/*.jsx'])
         .pipe(babel())
         .pipe(gulp.dest('app/'))
         .pipe(livereload());
});

gulp.task('images', () => {
    return gulp.src('src/assets/*')
         .pipe(gulp.dest('app/assets'))
         .pipe(livereload());
})

gulp.task('watch', async function() {
  livereload.listen();
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.css', gulp.series('css'));
  gulp.watch('src/**/*.scss', gulp.series('sass'));
  gulp.watch('src/**/*.js', gulp.series('js'));
  gulp.watch('src/**/*.jsx', gulp.series('jsx'));
  gulp.watch('src/assets/**/*', gulp.series('images'));
});

gulp.task('build', gulp.series('html','sass', 'css', 'js', 'jsx', 'images'));

gulp.task('start', gulp.series('build', () => {
    console.log('stating')
    return exec(
        __dirname+'/node_modules/.bin/electron .'
    ).on('close', () => process.exit());
}));

gulp.task('default', gulp.parallel('start', 'watch'));

gulp.task('release', gulp.series('build', () => {
    return exec(
        __dirname+'/node_modules/.bin/electron-builder .'
    ).on('close', () => process.exit());
}));
