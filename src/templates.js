
/**
 * @description Template related tasks
 */

// Jade
module.exports.jade = (config) => {
  const gulp = require('gulp');
  const gulpConnect = require('gulp-connect');
  const gulpJade = require('gulp-jade');

  const TEMPLATES_CONFIG = Object.assign({
    dst: './dist',
    src: './src/**/*.jade',
    taskName: 'templates',
  }, config);

  if (!TEMPLATES_CONFIG.dst || !TEMPLATES_CONFIG.src) {
    throw new Error('Invalid configuration: value of dst needs to be a path and value of src needs to be a glob or an array of globs.');
  }

  gulp.task(TEMPLATES_CONFIG.taskName, () => {
    return gulp.src(TEMPLATES_CONFIG.src)
      .pipe(gulpJade({
        locals: {
          DATE_TIME: (new Date().getTime()),
        },
      }))
      .pipe(gulp.dest(TEMPLATES_CONFIG.dst))
      .pipe(gulpConnect.reload());
  });
};