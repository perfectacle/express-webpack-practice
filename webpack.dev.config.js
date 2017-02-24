'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

const ROOT = './app/src';

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server',
    `${ROOT}/app`
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${ROOT}/index.html`,
    }),
    new ExtractTextPlugin('bundle.css'),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?cacheDirectory'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loaders: ['style', 'css?sourceMap']
    }, {
      test: /\.html/,
      loaders: ['raw-loader']
    }]
  },
  devServer: {
    hot: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    contentBase: ROOT,
    proxy: {
      '*': 'http://localhost:3000'
    }
  }
};
