const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config.js')

/**
 * Webpack Configuration
 */
module.exports = merge(baseConfig, {
  devtool: "cheap-eval-source-map",
  devServer: {
  	contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/app/home/index.html'
    })
  ]
})