var path = require('path');

module.exports = {
    target:  'node',
    context: __dirname,
    entry: './test.js',
    output:  {
        path: path.join(__dirname, '..', 'build'),
        filename: '[name].js',
    },
    textTransformLoader: function() {
        return {
            defaults: {},
            prepend: {
                prependText: '// prepend: prependText\n',
            },
            append: {
                appendText: '// append: appendText\n',
            },
            prependAppend: {
                prependText: '// prependAppend: prependText\n',
                appendText: '// prependAppend: appendText\n',
            },
            transform: {
                transformText: function(content) {
                    return '// transform: transformText\n' + content;
                },
            },
            transformQuery: {
                transformText: function(content, query) {
                    return '// transform: transformText\n' + content + '// ' + JSON.stringify(query) + '\n';
                },
            },
        };
    },
};
