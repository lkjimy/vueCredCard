const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: [
    "./example/src/main.js"
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.png'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Vue CredCard',
      template: './example/public/index.html'
    })
  ]
} 
