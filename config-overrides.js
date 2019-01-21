const { override, addBabelPlugins, fixBabelImports } = require('customize-cra')

module.exports = override(
  ...addBabelPlugins('babel-plugin-styled-components'),
  fixBabelImports('lodash', {
    libraryDirectory: '',
    camel2DashComponentName: false,
  })
)
