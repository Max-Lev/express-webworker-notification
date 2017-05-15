var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

console.log('webpack-prod.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    // chunkFilename: '[id].[hash].chunk.js'
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    // new ExtractTextPlugin('[name].[hash].css'),
    //new ExtractTextPlugin('[name].css'),

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    }),
    new UglifyJSPlugin({
      exclude: 'node_modules',
      include: /\.min$\.js$/,
      minimize: true,
      compress: true,
      sourceMap: false,
      mangle: false,
      //mangle: {
      //// Skip mangling these
      // except: ['$super', '$', 'exports', 'require']
      // }
    })
  ]
});
