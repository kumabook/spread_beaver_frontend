const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin      = require('brotli-webpack-plugin');

const extractCSSModule = new ExtractTextPlugin({ filename: 'bundle.css' });
const extractVendorCSS = new ExtractTextPlugin({ filename: 'vendor.css' });

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  devtool: 'inline-source-map',
  entry:   './lib/client.jsx',
  output:  {
    path:       path.resolve(__dirname, 'static'),
    filename:   'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:             JSON.stringify(NODE_ENV),
        DOMAIN:               JSON.stringify(process.env.DOMAIN),
        BASE_URL:             JSON.stringify(process.env.BASE_URL),
      },
    }),
    NODE_ENV === 'production' ? new webpack.optimize.UglifyJsPlugin() : null,
    extractCSSModule,
    extractVendorCSS,
    new CompressionPlugin(),
    new BrotliPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test:    /.jsx?$/,
        exclude: /node_modules/,
        use:     {
          loader: 'babel-loader',
          options: { forceEnv: process.env.NODE_ENV },
        },
      },
      {
        test: /\.css$/,
        exclude: /static\/.*\.css/,
        use: extractCSSModule.extract({
          fallback: 'style-loader',
          use: [{
            loader:  'css-loader',
            options: {
              modules:        true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          }],
        }),
      },
      {
        test: /\.css$/,
        include: /static\/.*\.css/,
        use: extractVendorCSS.extract({
          fallback: 'style-loader',
          use: [{ loader:  'css-loader' }],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
