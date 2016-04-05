'use strict';

var utils = require('loader-utils');

// Matches a `toString()`-ed function into name, arguments, and body
var FN_REGEX = /^[\s\n\r]*function\s*([^\(\s\n\r]*)\s*\(([^\)]*)\)[\s\n\r]*\{([\s\S]*)\}[\s\n\r]*$/m;
function stringToFunction(fnStr) {
    var matched = fnStr.match(FN_REGEX);
    if (matched) {
        var args = matched[2].replace(/\s+/g, '').split(',');
        var body = matched[3];
        return Function(args, body);
    }
}

function textTransformLoader(content) {
    var options = utils.parseQuery(this.query);

    var prependText = options.prependText;
    var appendText = options.appendText;
    var transformText = options.transformText;

    if (typeof transformText === 'string') {
        transformText = stringToFunction(decodeURIComponent(transformText));
    }

    if (typeof transformText === 'function') {
        content = transformText(content, options);
    }
    if (prependText) {
        content = prependText + content;
    }
    if (appendText) {
        content += appendText;
    }

    return content;
};

module.exports = textTransformLoader;
