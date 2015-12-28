const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const child_process = require('child_process');

// Sends a notification when JSHint fails
function jshintNotify(file) {
    if (!file.jshint) {
        return;
    }
    return file.jshint.success ? false : 'JSHint failed';
}

// Sends a notification when JSCS fails
function jscsNotify(file) {
    if (!file.jscs) {
        return;
    }
    return file.jscs.success ? false : 'JSCS failed';
}

function createLintTask(taskName, files) {
    gulp.task(taskName, function() {
        return gulp.src(files)
            .pipe($.plumber())
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish'))
            .pipe($.notify(jshintNotify))
            .pipe($.jscs())
            .pipe($.jscs.reporter())
            .pipe($.notify(jscsNotify))
            .pipe($.jshint.reporter('fail'));
    });
}

// Lint our source code
createLintTask('lint-src', ['src/**/*.js']);

// Lint our test code
createLintTask('lint-test', ['test/**/*.js']);

// Lint all the code
gulp.task('lint', ['lint-src', 'lint-test']);

// Build API docs
gulp.task('apidocs', function() {
    var args = [
        './node_modules/jsdoc/jsdoc.js',
        '-r',
        'src',
        '-d',
        'apidocs'
    ];

    var jsdoc = child_process.spawn('node', args);

    jsdoc.stdout.on('data', function(data) {
        process.stdout.write(data);
    });

    jsdoc.stderr.on('data', function(data) {
        process.stdout.write(data);
    });
});

// An alias of lint
gulp.task('default', ['lint']);
