const { override } = require('customize-cra');

module.exports = override((config) => {
  config.output.publicPath = '/my-home';
  return config;
});
