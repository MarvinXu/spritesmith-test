const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')
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
  resolve: {
    modules: ['node_modules', 'spritesmith-generated']
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
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'img/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
          cwd: resolve(__dirname, '../src/app/'),
          glob: '*.png'
      },
      target: {
          image: path.resolve(__dirname, '../src/spritesmith-generated/home-sprite.png'),
          css: path.resolve(__dirname, '../src/spritesmith-generated/home-sprite.scss')
      }
    })
  ]
}