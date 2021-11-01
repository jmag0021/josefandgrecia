'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Keeps watching for amended files
var watch = require('gulp-watch');

var paths = {
    source: './dist',
    destination: './public'
};

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// gulp.task('copy', function() {
//     return gulp.src(paths.source + '/**/*', {base: paths.source})
//         .pipe(gulp.dest(paths.destination));
// });

// gulp.task('watch-amended-folder', function() {
//     return gulp.src(paths.source + '/**/*', {base: paths.source})
//         .pipe(watch(paths.source, {base: paths.source}))
//         .pipe(gulp.dest(paths.destination));
// });

// default task
gulp.task('default', gulp.series('sass', 'minify-js'));