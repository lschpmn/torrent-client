'use strict';

const { join } = require('path');

module.exports = {
  context: join(__dirname, 'client'),

  entry: ['react-hot-loader/patch', './index.tsx'],

  output: {
    path: join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-optional-chaining',
              'react-hot-loader/babel',
            ],
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  devServer: {
    contentBase: join(__dirname, 'client'),
    port: 5000,
  },

  target: 'electron-renderer',

  devtool: 'source-map',
};
