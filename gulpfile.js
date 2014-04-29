var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util');

var paths = {
    bower: ['./bower_components/**/*', '!./bower_components/**/.*', '!./bower_components/**/bower.json'],
    coffee: ['./src/**/*.coffee'],
    html: ['./html/**/*.html'],

    build: {
        base: './build',
        bower: './build/bower',
        js: './build/js'
    }
};

gulp.task('cs-copy', function() {
    return gulp.src(paths.coffee)
        .pipe(gulp.dest(paths.build.js))
        .pipe(notify({ message: 'Copied <%= file.relative %>' }))
        ;
});

gulp.task('cs', ['cs-copy'], function() {
    return gulp.src(paths.coffee)
        .pipe(coffee({bare: true, sourceMap: true}).on('error', gutil.log))
        .pipe(gulp.dest(paths.build.js))
        .pipe(notify({ message: 'Compiled <%= file.relative %>' }))
        ;
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.build.base))
        .pipe(notify({ message: 'Copied <%= file.relative %>' }))
        ;
});

gulp.task('bower', function() {
    return gulp.src(paths.bower)
        .pipe(gulp.dest(paths.build.bower))
        .pipe(notify({ message: 'Copied bower component <%= file.relative %>' }))
        ;
});

gulp.task('default', [], function() {
    gulp.start('bower', 'cs', 'html');
});
