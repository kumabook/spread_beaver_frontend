const path    = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: './lib/client.jsx',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
