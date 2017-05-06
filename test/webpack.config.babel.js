const path = require('path');

const { LoaderOptionsPlugin } = require('webpack');

module.exports = {
  target: 'node',
  context: __dirname,
  entry: { test: './test.js' },
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\/input\/.*\.[^.]+$/,
        loader: 'raw-loader',
      },
      {
        test: /\/input\/.*\.prepend\.[^.]+$/,
        use: {
          loader: 'text-transform-loader',
          options: {
            prependText: '// prepend: prependText\n',
          },
        },
      },
      {
        test: /\/input\/.*\.append\.[^.]+$/,
        use: {
          loader: 'text-transform-loader',
          options: {
            appendText: '// append: appendText\n',
          },
        },
      },
      {
        test: /\/input\/.*\.transform\.[^.]+$/,
        use: {
          loader: 'text-transform-loader',
          options: {
            transformText: content => `// transform: transformText\n${content}`,
          },
        },
      },
      {
        test: /\/input\/.*\.allOptions\.[^.]+$/,
        use: {
          loader: 'text-transform-loader',
          options: {
            transformText: content => content
              .replace(/allOptions/g, 'someOptions')
              .replace('Hello, world.', 'Goodbye Bread'),
            prependText: '// allOptions: prependText\n',
            appendText: '// allOptions: appendText\n',
          },
        },
      },
    ],
  },
  plugins: [
    new LoaderOptionsPlugin({
      options: {
        textTransformLoader: () => ({
          defaults: {},
          prepend: {
            prependText: '// prepend: prependText\n',
          },
          append: {
            appendText: '// append: appendText\n',
          },
          transform: {
            transformText: content => `// transform: transformText\n${content}`,
          },
          allOptions: {
            transformText: content => content
              .replace(/allOptions/g, 'someOptions')
              .replace('Hello, world.', 'Goodbye Bread'),
            prependText: '// allOptions: prependText\n',
            appendText: '// allOptions: appendText\n',
          },
          transformQuery: {
            transformText: (content, query) =>
              `// transform: transformText\n${content}// ${JSON.stringify(query)}\n`,
          },
        }),
      },
    }),
  ],
  resolveLoader: {
    modules: ['node_modules', 'lib'],
  },
};
