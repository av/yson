/**
 * Created by Cherepanov_IA on 09/10/2015.
 */
var $ = require('requirist')([
    //Natives
    'path', 'fs',

    //Node Modules
    'gulp-util as gutil',
    'through2 as through',
    'svg2png as converter'
]);

function convert(file, options) {
    $.converter(file.path, file.path.replace(/.svg$/, '.png'), function() {
        console.log(arguments);
    });
}

module.exports = function (options) {
    return $.through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new $.gutil.PluginError('gulp-svg-to-png', 'Streaming not supported'));
            return;
        }

        try {
            convert(file, options);

            this.push(file);
        } catch (err) {
            this.emit('error', new $.gutil.PluginError('gulp-svg-to-png', err));
        }

        cb();
    });
};