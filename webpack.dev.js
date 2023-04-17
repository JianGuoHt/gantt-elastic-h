const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    port: 9000,
  },
  devtool: 'inline-source-map',
  mode: 'development',
  entry: './demo/index.js',
  output: {},

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new VueLoaderPlugin(),
  ],
};
