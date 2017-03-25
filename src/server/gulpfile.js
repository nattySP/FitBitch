const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
    return gulp.src(['./**/*.js', '!node_modules/**/*'])
        .pipe(babel({
            plugins: ['transform-async-to-generator',
                'transform-es2015-modules-commonjs',
                'syntax-async-functions']
        }))
        .pipe(gulp.dest('../../dist/server'));
});

gulp.task('copy_node_modules', () => {
    return gulp.src(['node_modules/**/*'])
        .pipe(gulp.dest('../../dist/server/node_modules'));
});