const webpack = require('webpack');

module.exports = {
  entry: {
    index: './views/index.js'
  },
  output: {
    path: __dirname + '/static',
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
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
