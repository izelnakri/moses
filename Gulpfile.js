//put the jshint right before the error!

//add icons


var gulp = require('gulp')
    gulpif = require('gulp-if'),
    colors = require('colors'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    path = require('path'),
    fs = require('fs'),
    prependFile = require('prepend-file');
    // buildConfig = require('./config/build.js'),

function cssToJs () {
    var string = fs.readFileSync('src/moses.css', 'utf8');

    prependFile('src/moses.js', "var css = \"" + string + "\";", function (err) {
        if (err) {
            throw err;
        }
        console.log("successfully prepended");
    })
}



// TASKS
gulp.task('default', usage);
gulp.task('usage', usage);

gulp.task('compile', ['css:minify', 'js']);

gulp.task('watch', ['compile'], function() {
    // gulp.watch(buildConfig.sass.watch, ['css']);
    gulp.watch('dev/**/*.scss', ['css:minify']);

    gulp.watch('external/*.js', ['js:vendor']);

    gulp.watch('dev/**/*.js', ['js'])
});

gulp.task('css:minify', function() {
    return gulp.src('dev/scss/mosesThemeDefault.scss')
        .pipe(sass({
            cacheLocation: '/tmp/sass', onError: function(er) {
                console.log(er);
                return false;
            }
        }))
        .pipe(prefix())
        .pipe(minifyCSS())
        .pipe(concat('moses.css'))
        .pipe(gulp.dest('src'))
});

// gulp.task('css:compile', function () {
//     return gulp.src('src/moses.scss')
//         .pipe()
// });

gulp.task('js:compile', ['js:vendor'], function () {
    return gulp.src(['build/vendor.js', 'dev/js/moses.js'])
        // .pipe(jshint())
        .pipe(concat('moses.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src'))
});

gulp.task('js', ['js:compile'], function() {
    cssToJs();
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
