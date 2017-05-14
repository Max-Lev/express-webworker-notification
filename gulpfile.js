var gulp = require('gulp');
var jsHint = require('gulp-jshint');
var jscs = require('gulp-jscs');


var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('styles-checker', function () {
    return gulp.src(jsFiles)
        .pipe(jsHint())
        .pipe(jsHint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {

    // injecting static links from bower libs to index.html
    // uses <!--bower:js||css--><!--endbower--> as a position
    var wiredep = require('wiredep').stream;

    //options: ignorePath: formates required path
    //css fix for wiredep: overrides inside bower.json files
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: ['../../public/']
    };

    //injecting custome files
    var inject = require('gulp-inject');
    //injectSrc: path to custome files
    var injectSrc = gulp.src(['./public/css/*.css',
        './public/js/*.js', '!./public/js/w-worker.js'], {
            read: false,
            //ignorePath: './public/js/w-worker.js'
        });
    var injectOptions = {
        ignorePath: '/public'
    };

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));

});
