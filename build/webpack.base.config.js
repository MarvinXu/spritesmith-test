const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    home: './src/app/home/index.js'
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: resolve('node_modules'),
        use: isProd ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }) : ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: ['raw-loader']
      }
    ]
  }
}