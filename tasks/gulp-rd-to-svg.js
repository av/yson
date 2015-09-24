var $ = require('requirist')([
    //Natives
    'path', 'fs',

    //Node Modules
    'gulp-util as gutil',
    'through2 as through',
    'railroad-diagrams as rd'
]);

var NAMESPACE = {
    xmlns: 'http://www.w3.org/2000/svg',
    link: 'http://www.w3.org/1999/xlink'
};

var STYLE = $.fs.readFileSync('./node_modules/railroad-diagrams/railroad-diagrams.css', 'utf-8');

function convert(file, options) {
    var svg = $.rd.Diagram(file.contents.toString());

    svg.attrs['xmlns'] = NAMESPACE.xmlns;
    svg.attrs['xmlns:xlink'] = NAMESPACE.link;
    svg.items.unshift({
        tagName: 'style',
        format: function() {

        },
        addTo: function() {

        },
        toString: function() {
            return '/* <![CDATA[ */' +
                    STYLE +
                    '/* ]]> */';
        }
    });

    return svg.toString();
}

module.exports = function (options) {
    return $.through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new $.gutil.PluginError('gulp-rd-to-svg', 'Streaming not supported'));
            return;
        }

        try {
            file.contents = new Buffer(convert(file, options));

            this.push(file);
        } catch (err) {
            this.emit('error', new $.gutil.PluginError('gulp-rd-to-svg', err));
        }

        cb();
    });
};