const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
    return gulp.src(['server/**/*.js'])
        .pipe(babel({
            plugins: ['transform-async-to-generator',
                'transform-es2015-modules-commonjs',
                'syntax-async-functions']
        }))
        .pipe(gulp.dest('dist'));
});