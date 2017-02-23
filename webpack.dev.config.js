const webpack = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

const ROOT = './app/src';

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    `${ROOT}/index`
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
    }]
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: ROOT,
    proxy: {
      '*': 'http://localhost:3000'
    }
  }
};
