var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');
var rd = require('railroad-diagrams');

function convert(file, options) {
    return rd.Diagram(file.contents.toString()).toString();
}

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-rd-to-svg', 'Streaming not supported'));
            return;
        }

        try {
            file.contents = new Buffer(convert(file, options));

            this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-rd-to-svg', err));
        }

        cb();
    });
};