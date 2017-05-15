var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');

console.log('webpack.dev.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
   // path: helpers.root('src'),
    //publicPath: 'http://localhost:4200/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    // new ExtractTextPlugin('[name].css')
   // new ExtractTextPlugin('styles.css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
