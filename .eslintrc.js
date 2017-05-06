module.exports = {
  extends: [
    'airbnb-base',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
};
