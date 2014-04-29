var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util');

gulp.task('cs', function() {
    return gulp.src('./src/**/*.coffee')
        .pipe(coffee({bare: true, map: true}).on('error', gutil.log))
        .pipe(gulp.dest('./static'))
        .pipe(notify({ message: 'Compiled <%= file.relative %>' }))
        ;
});

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./static'))
        .pipe(notify({ message: 'Copied <%= file.relative %>' }))
        ;
});

gulp.task('default', [], function() {
    gulp.start('cs', 'html');
});