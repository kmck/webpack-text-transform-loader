'use strict';

var utils = require('loader-utils');

function textTransformLoader(content) {
    // Query parameters
    var params = utils.parseQuery(this.query);

    // Configuration options
    var options = this.options.textTransformLoader;
    if (typeof options === 'function') {
        options = options.call(this, this);
    }

    if (!options) {
        options = {};
    } else if (params.pack && options[params.pack]) {
        options = options[params.pack];
    } else if (options.defaults) {
        options = options.defaults;
    }

    if (this.cacheable && !options.noCache) {
        this.cacheable();
    }

    var prependText = params.prependText || options.prependText;
    var appendText = params.appendText || options.appendText;
    var transformText = options.transformText;

    if (typeof transformText === 'function') {
        content = transformText(content, params);
    }
    if (prependText) {
        content = prependText + content;
    }
    if (appendText) {
        content += appendText;
    }

    return content;
}

module.exports = textTransformLoader;
