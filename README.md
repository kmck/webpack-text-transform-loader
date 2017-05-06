# Text Transform Loader

[![Build Status](https://travis-ci.org/kmck/webpack-text-transform-loader.svg?branch=master)](https://travis-ci.org/kmck/webpack-text-transform-loader)

Webpack loader to prepend, append, or otherwise modify the text content of a module

You can use this for things like injecting headers or footers into your modules BEFORE any other
loaders do their processing. For example, say you want to prepend all of your `.scss` files with
the same `@import` function. You can do that!

This version supports [webpack 2.x](https://webpack.js.org/)! If you try it and run into problems, check out the [webpack 1.x](https://github.com/kmck/webpack-text-transform-loader/tree/v1.1.1) release instead.

### Installation

Via yarn:

```bash
yarn add --dev text-transform-loader
```

Via npm:

```bash
npm install --save-dev text-transform-loader
```

### Configuration

Here are the things you can configure:

* `prependText`: adds text to the top of the module
* `appendText`: adds text to the bottom of the module
* `transformText`: transforms the module by running the `content` and loader `options`
 through a custom function that returns the new content

### Usage

Specify the loader and options in your webpack configuration:

```js
{
  // ...
  module: {
    rules: [
      test: /\.s?css$/,
      use: {
        loader: 'text-transform-loader',
        options: {
          prependText: '@import \'your/stuff\';\n\n',
        }
      }
    ]
  },
  // ...
}
```
