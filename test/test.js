var assert = require('chai').assert;
var fs = require('fs');

// Note: This file gets webpacked, so `fileToLoad` must be root-relative!
function loadFile(fileToLoad) {
    return fs.readFileSync(fileToLoad).toString();
}

describe('text-transform-loader', function() {

    // Options
    it('prepends text via options', function() {
        var content = require('!raw-loader!../?pack=prepend!./cases/hello.txt');
        assert.equal(content, loadFile('test/cases/hello.prepend.txt'));
    });

    it('appends text via options', function() {
        var content = require('!raw-loader!../?pack=append!./cases/hello.txt');
        assert.equal(content, loadFile('test/cases/hello.append.txt'));
    });

    it('transforms text via options', function() {
        var content = require('!raw-loader!../?pack=transform!./cases/hello.txt');
        assert.equal(content, loadFile('test/cases/hello.transform.txt'));
    });

    // Query string
    it('prepends text via query string', function() {
        // var queryString = '?prependText=' + encodeURIComponent('// prepend-query: prependText\n');
        var content = require('!raw-loader!../?prependText=%2F%2F%20prepend-query%3A%20prependText%0A!./cases/hello.txt');
        assert.equal(content, loadFile('test/cases/hello.prepend-query.txt'));
    });

    it('appends text via query string', function() {
        // var queryString = '?appendText=' + encodeURIComponent('// append-query: appendText\n');
        var content = require('!raw-loader!../?appendText=%2F%2F%20append-query%3A%20appendText%0A!./cases/hello.txt');
        assert.equal(content, loadFile('test/cases/hello.append-query.txt'));
    });

    // Advanced behavior
    it('passes query params to transformText', function() {
        // var queryString = '?pack=transformQuery&dog=' + encodeURIComponent('franny');
        var content = require('!raw-loader!../?pack=transformQuery&dog=franny!./cases/hello.txt');
        assert.equal(content, loadFile('test/cases/hello.transform-query.txt'));
    });

    it('chooses query string over options', function() {
        // var queryString = '?pack=prependAppend&prependText=' + encodeURIComponent('// prefer-query: prependText\n') + '&appendText=' + encodeURIComponent('// prefer-query: appendText\n');
        var content = require('!raw-loader!../?pack=prependAppend&prependText=%2F%2F%20prefer-query%3A%20prependText%0A&appendText=%2F%2F%20prefer-query%3A%20appendText%0A!./cases/hello.txt');
        assert.equal(content, loadFile('test/cases/hello.prefer-query.txt'));
    });

});
