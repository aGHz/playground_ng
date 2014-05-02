var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    shell = require('gulp-shell');

var paths = {
    bower: ['./bower_components/**/*', '!./bower_components/**/.*', '!./bower_components/**/bower.json'],
    coffee: ['./src/**/*.coffee'],
    html: ['./html/**/*.html'],
    less: ['./less/**/*.less'],

    build: {
        base: './build',
        bower: './build/bower',
        css: './build/style',
        js: './build/js',
        vendor: './build/vendor'
    },

    vendor: {
        bootstrap: './vendor/bootstrap/dist/**'
    }
};

gulp.task('cs-copy', function() {
    return gulp.src(paths.coffee)
        .pipe(gulp.dest(paths.build.js))
        .pipe(notify({ message: '[CS] Copied <%= file.relative %>' }))
        ;
});

gulp.task('cs', ['cs-copy'], function() {
    return gulp.src(paths.coffee)
        .pipe(coffee({bare: true, sourceMap: true}).on('error', gutil.log))
        .pipe(gulp.dest(paths.build.js))
        .pipe(notify({ message: '[CS] Compiled <%= file.relative %>' }))
        ;
});

gulp.task('less', [], function() {
    return gulp.src(paths.less)
        .pipe(less({sourceMap: false})) // TODO non-inline source maps
        .pipe(gulp.dest(paths.build.css))
        .pipe(notify({ message: '[LESS] Compiled <%= file.relative %>' }))
        ;
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.build.base))
        .pipe(notify({ message: '[HTML] Copied <%= file.relative %>' }))
        ;
});

gulp.task('bower', function() {
    return gulp.src(paths.bower)
        .pipe(gulp.dest(paths.build.bower))
        .pipe(notify({ message: '[BOWER] Copied bower component <%= file.relative %>' }))
        ;
});

gulp.task('default', [], function() {
    gulp.start('bower', 'cs', 'less', 'html');
});


gulp.task('bootstrap-make', shell.task(
    ['grunt dist'],
    {cwd: './vendor/bootstrap'}
));

gulp.task('bootstrap', ['bootstrap-make'], function() {
    return gulp.src(paths.vendor.bootstrap)
        .pipe(gulp.dest(paths.build.vendor + '/bootstrap'))
        ;
});
