const { override } = require('customize-cra');

module.exports = override((config) => {
  const isProductionMode = config.mode === 'production';

  if (isProductionMode) {
    config.output.publicPath = '/my-home';
  }

  return config;
});
