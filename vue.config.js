const path = require('path')

module.exports = {
  outputDir: 'public',
  lintOnSave: true,
  devServer: {
    contentBase: path.join(__dirname, 'resources'),
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(([options]) => [Object.assign(options, {
          template: path.resolve('resources/index.html'),
      })])
  }
}
