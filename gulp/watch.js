'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch('src/{app,components}/**/*.less', ['styles']);
  gulp.watch(['src/{app,components}/**/*.js', '!src/{app,components}/**/*.spec.js', '!src/{app,components}/**/*.e2e.js'], ['scripts']);
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
