var $ = require('requirist')([
    //Natives
    'path', 'fs',

    //Node Modules
    'gulp-util as gutil',
    'through2 as through',
    'railroad-diagrams as rd'
]);
var vm = require('vm')
var DiagramContext = vm.createContext($.rd);

var NAMESPACE = {
    xmlns: 'http://www.w3.org/2000/svg',
    link: 'http://www.w3.org/1999/xlink'
};

var STYLE = $.fs.readFileSync('./node_modules/railroad-diagrams/railroad-diagrams.css', 'utf-8');

function FakeStyle(content) {
    this.content = content;
}

FakeStyle.prototype = {
    format: function() {
        return {
            addTo: function() {}
        };
    },

    toString: function() {
        return '<style>' +
                    '/* <![CDATA[ */' +
                    this.content +
                    '/* ]]> */' +
               '</style>';
    }
};

function convert(file, options) {
    var svg = vm.runInContext(file.contents.toString(), DiagramContext);

    svg.attrs['xmlns'] = NAMESPACE.xmlns;
    svg.attrs['xmlns:xlink'] = NAMESPACE.link;
    svg.children.unshift(new FakeStyle(STYLE));

    return '<?xml version="1.0" encoding="UTF-8"?>\n' + svg.toString();
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