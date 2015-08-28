const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }

        ]
  },
  plugins: [
   new ExtractTextPlugin("app.css")
  ] 
};
