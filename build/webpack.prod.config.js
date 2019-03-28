// webpack.prod.config.js

const config = require('./webpack.config.js')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = Object.assign(config, {
  entry: [
    '../src/index.js'
  ],
  context: path.resolve(__dirname, '../src'),
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new VueLoaderPlugin()
  ]
})