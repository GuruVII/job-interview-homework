var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'js/[name].js'
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
      new ExtractTextPlugin('css/style.css', {
          allChunks: true
      }),
      /*new LiveReloadPlugin({
        appendScriptTag : true  
      })*/
  ],
  //stats: {
    //colors: true
  //},
  // devtool: 'source-map'
};
