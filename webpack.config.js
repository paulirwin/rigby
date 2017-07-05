'use strict';

// Shoutout to Redux for the build scripts: https://github.com/reactjs/redux/blob/master/webpack.config.js

var webpack = require('webpack'),
    path = require('path');

var env = process.env.NODE_ENV
var config = {
  entry: {
    rigby: path.resolve(__dirname, "./src")
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    loaders: [
      { 
        test: /\.ts$/, 
        loader: 'awesome-typescript-loader', 
        exclude: /node_modules/ 
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "rigby.js"
  },
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        screw_ie8: false
      },
      mangle: {
        screw_ie8: false
      },
      output: {
        screw_ie8: false
      }
    })
  );
  config.output.filename = "rigby.min.js"
}

module.exports = config