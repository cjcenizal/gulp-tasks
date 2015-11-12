
/**
 * @description Deployment related tasks
 */

// AWS SDK
module.exports.awsS3 = (config) => {
  const gulp = require('gulp');
  const gulpAwspublish = require('gulp-awspublish');
  const minimist = require('minimist');

  const DEPLOY_CONFIG = Object.assign({
    bucketEnv: 'AWS_S3_BUCKET',
    src: './dist/**/*.*',
    taskName: 'deploy',
  }, config);

  if (!DEPLOY_CONFIG.src) {
    throw new Error('Invalid configuration: value of src needs to be a glob or an array of globs.');
  }

  gulp.task(DEPLOY_CONFIG.taskName, () => {
    /*
    To manually deploy the working copy the following command can be used:
    gulp deploy --accessKeyId=XXX --bucket=XXX --secretAccessKey=XXX

    The arguments can be provided via the command line as in this example where
    - accessKeyId is the AWS access key id,
    - bucket is the AWS S3 bucket and
    - secretAccessKey is the AWS secret access key.

    If the arguments are not provided via the command line they will be read
    from the environment variables
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - the environment variable for the bucket is set via the bucketEnv argument
    */
    const commandLineArguments = minimist(process.argv.slice(2));
    const publisher = gulpAwspublish.create({
      accessKeyId: commandLineArguments.accessKeyId || process.env.AWS_ACCESS_KEY_ID,
      params: {
        Bucket: commandLineArguments.bucket || process.env[DEPLOY_CONFIG.bucketEnv],
      },
      secretAccessKey: commandLineArguments.secretAccessKey || process.env.AWS_SECRET_ACCESS_KEY,
    });
    return gulp.src(DEPLOY_CONFIG.src)
      .pipe(publisher.publish())
      .pipe(publisher.sync())
      .pipe(gulpAwspublish.reporter());
  });
};