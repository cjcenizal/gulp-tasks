
const gulp = require('gulp');
const runSequence = require('run-sequence');
const lintJs = require('../index').lintJs;
const TextUtils = require('./services/TextUtils');

describe('lintJs method', () => {
  it('returns a config and a task', () => {
    const result = lintJs();
    expect(result).toEqual({
      config: jasmine.any(Object),
      task: jasmine.any(Function),
    });
  });

  describe('configuration', () => {
    it('throws errors when it contains falsy paths', () => {
      expect(() => {
        lintJs({
          src: false,
        });
      }).toThrowError(TextUtils.cleanString(
        `Invalid configuration: value of src needs to be a glob or an array
        of globs.`
      ));
    });
  });

  describe('gulp task', () => {
    it('completes successfully', (done) => {
      gulp.task('testLintJs', lintJs().task);

      /**
       * Because the Gulp task is async, we need to use runSequence to execute
       * the task and then call the `done` async callback.
       */
      runSequence('testLintJs', () => {
        expect(gulp.tasks.testLintJs.done).toBe(true);
        done();
      });
    });
  });
});
