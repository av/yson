var $ = require('requirist')([
    //Natives
    'path', 'fs',

    //Node Modules
    'gulp', 'gulp-util',
    'gulp-rename as rename',
    'gulp-ext-replace as extReplace',
    'del',

    //Local Modules
    './utils/paths as paths',
    './tasks/gulp-rd-to-svg as toSVG',
    './tasks/gulp-svg-to-png as toPNG'
]);

var gulp = $.gulp;

gulp.task('default', ['cleanup', 'diagrams:toPNG']);

gulp.task('diagrams:toSVG', function() {
    return gulp.src($.paths.src.diagrams)
        .pipe($.toSVG())
        .pipe($.extReplace('.svg'))
        .pipe($.rename(function(path) {
            path.dirname = '';
        }))
        .pipe(gulp.dest($.paths.dest.diagrams))
});

gulp.task('diagrams:toPNG', ['diagrams:toSVG'], function() {
    return gulp.src($.paths.dest.diagramsSVG)
        .pipe($.toPNG())
});

gulp.task('cleanup', function() {
    return $.del($.paths.cleanup);
});