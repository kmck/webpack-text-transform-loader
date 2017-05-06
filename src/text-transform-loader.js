const loaderUtils = require('loader-utils');

function textTransformLoader(srcContent) {
  const loaderOptions = loaderUtils.getOptions(this);

  let { textTransformLoader: compilerOptions = {} } = this.options || {};
  if (typeof compilerOptions === 'function') {
    compilerOptions = compilerOptions.call(this, this);
  }

  const { pack = 'default' } = loaderOptions;

  const options = {
    ...(pack in compilerOptions ? compilerOptions[pack] : compilerOptions),
    ...loaderOptions,
  };

  if (typeof this.cacheable === 'function') {
    this.cacheable(!compilerOptions.noCache);
  }

  const {
    prependText,
    appendText,
    transformText,
  } = options;

  let content = srcContent;
  if (typeof transformText === 'function') {
    content = transformText(content, loaderOptions);
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
