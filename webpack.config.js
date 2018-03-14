const webpack = require('webpack');

module.exports = {
  entry: {
    index: './views/index.js'
  },
  output: {
    path: `${__dirname}/static/js`,
    filename: '[name].min.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: `${__dirname}/views`,
      loader: 'babel-loader', 
    },{
      test: /\.css$/,
      include: `${__dirname}/views`,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }]
    }]
  },
  target: 'web',
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
};
