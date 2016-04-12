# Text Transform Loader

[![Build Status](https://travis-ci.org/kmck/webpack-text-transform-loader.svg?branch=master)](https://travis-ci.org/kmck/webpack-text-transform-loader)

Webpack loader to prepend, append, or otherwise modify the text content of a module

You can use this for things like injecting headers or footers into your modules BEFORE any other
loaders do their processing. For example, say you want to prepend all of your `.scss` files with
the same `@import` function. You can do that!

### Installation

```
npm install --save-dev text-transform-loader
```

### Configuration

Here are the things you can configure:

* `prependText`: adds text to the top of the module
* `appendText`: adds text to the bottom of the module
* `transformText`: transforms the module by running the `content` and loader `query` parameters
  through a custom function that returns the new content

You can specify these in the `textTransformLoader` section of the webpack config. If you prefer,
`prependText` and `appendText` also work in the query parameters for the loader, but don't forget
to pass them through `encodeURIComponent` to take care of any special characters!

### Usage

In your webpack configuration, use these query parameters...

```js
{
  // ...
  module: {
    loaders: [{
      test: /\.s?css$/,
      loader: 'style!css!sass!text-transform?prependText=' + encodeURIComponent('@import \'your/stuff\';\n\n'),
    }],
  },
  // ...
}
```

...or specify a `textTransformLoader` configuration...

```js
{
  // ...
  module: {
    loaders: [{
      test: /\.s?css$/,
      loader: 'style!css!sass!text-transform',
    }],
  },
  textTransformLoader: function() {
    return {
      prependText: '// thanks for stopping by!!',
      transformText: function(content, params) {
        return content.replace(/\.maximum-lungs/g, '.miracle-toast-with-stunning-face');
      },
    };
  },
  // ...
}
```

If you specify the same option in both places, the query parameter will take precedence.

### Option packs

There may come a day when you need the flexibility to specify multiple varieties of text
transformation when loading your modules. You can do this by specifying a `pack` in the query
params and providing the options for that pack in the configuration.

If no pack is specified, `defaults` will be used.

```js
{
  // ...
  module: {
    loaders: [{
      test: /\.s?css$/,
      loader: 'style!css!sass!text-transform?pack=redBody',
    }],
  },
  textTransformLoader: {
    redBody: {
      prependText: 'body { background-color: red; }',
    },
    defaults: {
      appendText: '// ~ fin ~',
    },
  },
  // ...
}
```
