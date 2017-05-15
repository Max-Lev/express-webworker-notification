var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

console.log('webpack.common.js');

module.exports = {

  entry: {
    'polyfills': './src/polyfills.ts',
    'app': './src/main.ts',
    'styles': './src/styles.css'
  },

  resolve: {
    extensions: ['.ts', '.js', '.css', '.html']
  },

  module: {
    rules: [

      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'to-string-loader', 'css-loader']
      }
    ]
  },

  plugins: [

    new CopyWebpackPlugin([{
      from: './src/app/worker.js'
    }]),

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'polyfills']
    }),

     new ExtractTextPlugin("styles.css"),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
