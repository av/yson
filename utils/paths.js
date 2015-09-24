// DESCRIPTORS
var ROOT =          './';
var ANY_FILE =      '*';
var ANY_FOLDER =    '**';
var RD_FILES =      '*.rd';
var SRC =           'src';
var ASSETS =        'assets';
var NOTATIONS =     'notations';
var PAGE =          'index.jade';

function globJoin() {
    return Array.prototype.slice.call(arguments).join('/');
}

module.exports = {
    root: ROOT,
    src: {
        diagrams: globJoin(ROOT, SRC, ANY_FOLDER, RD_FILES),
        page: globJoin(ROOT, SRC, PAGE)
    },
    dest: {
        diagrams: globJoin(ROOT, ASSETS, NOTATIONS)
    },
    cleanup: [
        globJoin(ROOT, ASSETS, NOTATIONS, ANY_FOLDER, ANY_FILE)
    ]
};