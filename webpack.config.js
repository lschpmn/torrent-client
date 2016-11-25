'use strict';

const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.html$|\.eot$|\.woff$|\.woff2$|\.ttf$/, loader: 'file?name=[name].[ext]'},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel?presets[]=react,presets[]=es2015"}
    ]
  },
  
  devServer: {
    inline: true,
    port: 5000,
    hot: true,
    historyApiFallback: true
  }
};