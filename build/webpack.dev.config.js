// webpack.prod.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./webpack.config.js')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = Object.assign(config, {
  context: path.resolve(__dirname, './'),
  entry: [
    '../example/src/main.js'
  ],
  mode: 'development',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: '../example/public/index.html'
    })
  ]
})