//put the jshint right before the error!

var gulp = require('gulp')
    gulpif = require('gulp-if'),
    colors = require('colors'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    path = require('path');
    // buildConfig = require('./config/build.js'),


// TASKS
gulp.task('default', usage);
gulp.task('usage', usage);

gulp.task('compile', ['css', 'js']);

gulp.task('watch', ['compile'], function() {
    // gulp.watch(buildConfig.sass.watch, ['css']);

    gulp.watch('external/*.js', ['js:vendor']);

    gulp.watch('dev/**/*.js', ['js'])
});

gulp.task('css', function() {
    // return gulp.src(buildConfig.sass.src, {base: '../frontend'})
    //     .pipe(gulpif(devMode, plumber({
    //         errorHandler: notify('css error')
    //     })))
    //     .pipe(sass({
    //         cacheLocation: '/tmp/sass', onError: function(er) {
    //             console.log(er);
    //             return false;
    //         }
    //     }))
    //     .pipe(prefix())
    //     .pipe(gulpif(!devMode, minifyCSS()))
    //     .pipe(concat('frontend.css'))
    //     .pipe(gulpif(createSourceMaps, sourcemaps.write(sourceMapsLocation === 'external' ? '.' : undefined)))
    //     .pipe(gulp.dest(buildConfig.dest.css))
});

gulp.task('js', ['js:vendor'], function () {
    return gulp.src(['build/vendor.js', 'dev/js/moses.js'])
        // .pipe(jshint())
        .pipe(concat('moses.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src'))
});

gulp.task('js:vendor', function() {
    return gulp.src(['external/jquery.js', 
        'external/beautify.js', 'external/beautify-html.js',
        'external/shCore.js',   
        'external/shAutoloader.js', 'external/shBrushXml.js', 
        'external/shBrushJScript.js'])
        // .pipe(jshint())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

function usage() {
    console.log('usage: gulp compile | watch | usage [options]\n  options:\n    --dev       compile in development mode');
}
