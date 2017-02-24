'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT = './app/src';
const DIST = './app/dist';

module.exports = {
  entry: `${ROOT}/app`,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: `${ROOT}/index.html`,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new ExtractTextPlugin('bundle.min.css')
  ],
  output: {
    path: DIST,
    publicPath: '/',
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?cacheDirectory', 'webpack-strip?strip[]=debug,strip[]=console.log,strip[]=console.dir'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?minify', {publicPath: './'})
    }]
  }
};
