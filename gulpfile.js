import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import csso from 'gulp-csso';
import rename from 'gulp-rename';

const sass = gulpSass(dartSass);

export const process = () => gulp
  .src('./src/index.scss')
  .pipe(sass.sync({
    includePaths: ['./src', './node_modules'],
  }).on('error', sass.logError))
  .pipe(rename('kodimd.css'))
  .pipe(gulp.dest('./dist'));

export const minify = () => gulp
  .src('./dist/kodimd.css')
  .pipe(csso())
  .pipe(rename('kodimd.min.css'))
  .pipe(gulp.dest('./dist'));

export const build = gulp.series(process, minify);

export default () => gulp.watch(
  './src/**/*.scss', { ignoreInitial: false }, process
);
