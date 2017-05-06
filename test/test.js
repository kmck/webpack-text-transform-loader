/* eslint-disable global-require, import/no-unresolved, import/no-webpack-loader-syntax */

import { assert } from 'chai';
import fs from 'fs';

// Note: This file gets webpacked, so `fileToLoad` must be root-relative!
const loadFile = fileToLoad => fs.readFileSync(fileToLoad).toString();

describe('text-transform-loader', () => {
  describe('loader options', () => {
    it('prepends text specifeid by prependText option', () => {
      assert.equal(
        require('./input/hello.prepend.txt'),
        loadFile('test/output/hello.prepend.txt'),
      );
    });

    it('appends text specified by appendText option', () => {
      assert.equal(
        require('./input/hello.append.txt'),
        loadFile('test/output/hello.append.txt'),
      );
    });

    it('transforms text using transformText option', () => {
      assert.equal(
        require('./input/hello.transform.txt'),
        loadFile('test/output/hello.transform.txt'),
      );
    });

    it('works as expected when all options are specified at once', () => {
      assert.equal(
        require('./input/hello.allOptions.txt'),
        loadFile('test/output/hello.allOptions.txt'),
      );
    });
  });

  describe('query parameters', () => {
    it('prepends text when using ?prependText=', () => {
      // queryString = '?prependText=' + encodeURIComponent('// prependQuery: prependText\n');
      assert.equal(
        require('!raw-loader!../?prependText=%2F%2F%20prependQuery%3A%20prependText%0A!./input/hello.txt'),
        loadFile('test/output/hello.prependQuery.txt'),
      );
    });

    it('appends text when using ?appendText=', () => {
      // queryString = '?appendText=' + encodeURIComponent('// appendQuery: appendText\n');
      assert.equal(
        require('!raw-loader!../?appendText=%2F%2F%20appendQuery%3A%20appendText%0A!./input/hello.txt'),
        loadFile('test/output/hello.appendQuery.txt'),
      );
    });

    describe('option packs', () => {
      it('prepends text specified by prependText option', () => {
        assert.equal(
          require('!raw-loader!../?pack=prepend!./input/hello.txt'),
          loadFile('test/output/hello.prepend.txt'),
        );
      });

      it('appends text specified by appendText option', () => {
        assert.equal(
          require('!raw-loader!../?pack=append!./input/hello.txt'),
          loadFile('test/output/hello.append.txt'),
        );
      });

      it('transforms text using transformText option', () => {
        assert.equal(
          require('!raw-loader!../?pack=transform!./input/hello.txt'),
          loadFile('test/output/hello.transform.txt'),
        );
      });

      it('works as expected when all options are specified at once', () => {
        assert.equal(
          require('!raw-loader!../?pack=allOptions!./input/hello.txt'),
          loadFile('test/output/hello.allOptions.txt'),
        );
      });
    });
  });

  describe('advanced options', () => {
    it('passes query params to transformText', () => {
      // var queryString = '?pack=transformQuery&dog=' + encodeURIComponent('franny');
      assert.equal(
        require('!raw-loader!../?pack=transformQuery&dog=franny!./input/hello.txt'),
        loadFile('test/output/hello.transformQuery.txt'),
      );
    });

    it('chooses query string over options', () => {
      // queryString = '?pack=prependAppend' +
      //   '&prependText=' + encodeURIComponent('// preferQuery: prependText\n') +
      //   '&appendText=' + encodeURIComponent('// preferQuery: appendText\n');
      assert.equal(
        require('!raw-loader!../?pack=prependAppend&prependText=%2F%2F%20preferQuery%3A%20prependText%0A&appendText=%2F%2F%20preferQuery%3A%20appendText%0A!./input/hello.txt'),
        loadFile('test/output/hello.preferQuery.txt'),
      );
    });
  });
});
