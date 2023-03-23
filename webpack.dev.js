const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    // publicPath: path.join(__dirname, './dist'),
    // compress: false,
    port: 9000,
    // openPage: '/examples/vue.edit.html',
  },
  devtool: 'inline-source-map',
  mode: 'development',
  // entry: './src/bundle.js',
  entry: './src/index.js',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'GanttElastic.umd.js',
    // library: 'GanttElastic',
    // libraryTarget: 'umd',
    // libraryExport: 'default',
  },
  // externals: ['vue'],
  // resolve: {
  //   alias: {
  //     vue$: 'vue/dist/vue.esm.js',
  //   },
  // },
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new VueLoaderPlugin(),
  ],
};
