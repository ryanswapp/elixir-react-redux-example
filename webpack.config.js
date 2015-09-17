var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var path = require('path');

var env = process.env.MIX_ENV || 'dev';
var prod = env === 'prod';

var plugins = [new ExtractTextPlugin("app.css")];

// This is necessary to get the sass @import's working
var stylePathResolves = (
    'includePaths[]=' + path.resolve('./') + '&' +
    'includePaths[]=' + path.resolve('./node_modules')
  )

if (prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))
}

module.exports = {
  entry: "./web/static/js/app.js",
  output: {
    path: "./priv/static/js",
    filename: "app.js"
  },
  module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract(
                'style',
                'css' + '!sass?outputStyle=expanded&' + stylePathResolves
              )
            }

        ]
  },
  plugins: plugins
};
