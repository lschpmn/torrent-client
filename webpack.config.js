'use strict';

const { join } = require('path');

module.exports = {
  context: join(__dirname, 'client'),

  entry: './index.tsx',

  output: {
    path: join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  mode: 'development',

  module: {
    rules: [
      { test: /.html$/, loader: 'file-loader', },

      { test: /.tsx?$/, loader: 'ts-loader', },
    ],
  },
  
  serve: {
    port: 5000,
  }
};