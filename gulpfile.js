// Gulp imports
const gulp = require('gulp');
const cond = require('gulp-cond');
const eslint = require('gulp-eslint');
const insertLines = require('gulp-insert-lines');
//const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const gutil = require('gulp-util');
const babel = require('gulp-babel');

// Other libraries
const del = require('del');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');
const {argv} = require('yargs');
require('babel-core/register'); // Needed for mocha tests
require('babel-polyfill');

// If gulp was called in the terminal with the --prod flag, set the node environment to production
if (argv.prod) {
    process.env.NODE_ENV = 'production';
}
let PROD = process.env.NODE_ENV === 'production';

// Configuration
//TODO make this not stupid
const src = 'client';
const config = {
    port: PROD ? 8080 : 3000,
    paths: {
        baseDir: PROD ? 'build' : 'dist',
        html: src +'/index.html',
        js: src + '/**/*.js',
        entry: src + '/index.js',
        test: src +'/**/*.test.js'
    }
};

/**
 * Gulp Tasks
 **/

// Clears the contents of the dist and build folder
gulp.task('clean', () => {
    return del(['dist/**/*', 'build/**/*']);
});

// Linting
gulp.task('lint', () => {
    return gulp.src(config.paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
});

// Unit tests
//gulp.task('test', () => {
//    return gulp.src(config.paths.test, {read: false})
//        .pipe(mocha());
//});

gulp.task('build_server', ()=>{
    return gulp.src(['server/**/*.js'])
        .pipe(babel({
            plugins: [
                'transform-async-to-generator',
                'transform-es2015-modules-commonjs',
                'syntax-async-functions']
        }))
        .pipe(gulp.dest('dist/server'))
});


gulp.task('server', ['build_server'], () => {
    nodemon({
        exec: 'node --inspect',
        script: 'dist/server/server.js'
    });
});

// Re-runs specific tasks when certain files are changed
gulp.task('watch', () => {
    gulp.watch([config.paths.js, 'server/**/*.js'], () => {
        //runSequence('lint', 'test');
    });
});

// Copies our index.html file from the app folder to either the dist or build folder, depending on the node environment
gulp.task('html', () => {
    return gulp.src(config.paths.html)
        .pipe(cond(PROD, insertLines({
            before: /<\/head>$/,
            'lineBefore': '<link rel="stylesheet" href="bundle.css"/>'
        })))
        .pipe(gulp.dest(config.paths.baseDir + '/client'));
});

// Builds the entire web app into either the dist or build folder, depending on the node environment
gulp.task('build', () => {
    runSequence('clean', 'html');

    return gulp.src(config.paths.entry)
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest(config.paths.baseDir + '/client'));
});

// Default task, bundles the entire app and hosts it on an Express server
gulp.task('default', (cb) => {
    //runSequence('lint', 'test', 'build', 'server', 'watch', cb);
    runSequence('build', 'server', 'watch', cb);
});
