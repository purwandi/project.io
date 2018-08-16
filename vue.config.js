const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const Dotenv = require('dotenv-webpack');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  outputDir: 'public',
  lintOnSave: true,
  devServer: {
    contentBase: path.join(__dirname, 'resources'),
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(([options]) => [Object.assign(options, {
          template: path.resolve('resources/index.html'),
      })])
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') {
      return {
        resolve: {
          alias : {
            "icons": path.resolve(__dirname, "node_modules/vue-material-design-icons")
          }
        },
        plugins: [ new Dotenv() ]
      }
    } else {
      return {
        resolve: {
          alias : {
            "icons": path.resolve(__dirname, "node_modules/vue-material-design-icons")
          }
        },
        plugins: [
          new Dotenv(),
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, 'resources/*.vue'),
              path.join(__dirname, 'resources/**/*.vue'),
              path.join(__dirname, 'resources/**/**/*.vue'),
              path.join(__dirname, 'resources/index.html')
            ]),
            extractors: [ { extractor: TailwindExtractor, extensions: ["html", "js", "vue"] } ]
          })
        ]
      }
    }
  }
}
