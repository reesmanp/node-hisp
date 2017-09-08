const webpack = require('webpack');
const babili = require('babili-webpack-plugin');

module.exports = {
  entry: {
    index: './views/index.js'
  },
  output: {
    path: __dirname + '/static/js',
    filename: '[name].min.js'
  },
  plugins: [
    new babili()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
};
