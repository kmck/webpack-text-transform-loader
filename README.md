# Text Transform Loader

Webpack loader to prepend, append, or otherwise modify the text content of a module

You can use this for things like injecting headers or footers into your modules BEFORE any other
loaders do their processing. For example, say you want to prepend all of your `.scss` files with
the same `@import` function. You can do that!

### Installation

```
npm install --save-dev text-transform-loader
```

### Configuration

The loader can take the following query options:

* `prependText`: text to add to the top of the module
* `appendText`: text to add to the bottom of the module
* `transformText`: function that takes the `content` and loader `query` parameters as arguments and
  returns the new content

### Usage

In your webpack configuration...

```js
{
  // ...
  module: {
    loaders: [{
      test: /\.s?css$/,
      loader: 'sass!text-transform?prependText=' + encodeURIComponent('@import \'your/stuff\';\n\n'),
    }],
  },
  // ...
}
```
