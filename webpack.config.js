var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

var env = process.env.MIX_ENV || 'dev';
var prod = env === 'prod';

var plugins = [new ExtractTextPlugin("app.css")];

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
              loader: 'style!css!sass'
            }

        ]
  },
  plugins: plugins
};
