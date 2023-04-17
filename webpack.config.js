const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    mode: 'production',
    entry: './demo/index.js',
    output: {
      path: path.resolve(__dirname, 'demo/dist'),
      // clean: true,
    },
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
  },
  {
    mode: 'production',
    optimization: {
      minimize: false,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: false,
          },
        }),
      ],
    },
    entry: './src/GanttElastic.vue',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'GanttElastic.umd.js',
      library: 'GanttElastic',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    devtool: 'source-map',
    externals: {
      vue: 'Vue',
      //vuex: 'Vuex'
      //dayjs: 'dayjs'
    },
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
    plugins: [new VueLoaderPlugin()],
  },
  {
    mode: 'production',
    optimization: {
      minimize: true,
      namedModules: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: false,
          },
        }),
      ],
    },
    entry: './src/GanttElastic.vue',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'GanttElastic.umd.min.js',
      library: 'GanttElastic',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    externals: {
      vue: 'Vue',
      //vuex: 'Vuex'
      //dayjs: 'dayjs'
    },
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
    plugins: [new VueLoaderPlugin()],
  },
  {
    mode: 'production',
    optimization: {
      minimize: false,
    },
    entry: './src/GanttElastic.vue',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'GanttElastic.common.js',
      library: 'GanttElastic',
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
    },
    externals: {
      vue: 'Vue',
      //vuex: 'Vuex'
      //dayjs: 'dayjs'
    },
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
    plugins: [new VueLoaderPlugin()],
  },
  {
    mode: 'production',
    optimization: {
      minimize: true,
      namedModules: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: false,
          },
        }),
      ],
    },
    entry: './src/GanttElastic.vue',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'GanttElastic.common.min.js',
      library: 'GanttElastic',
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
    },
    externals: {
      vue: 'Vue',
      //vuex: 'Vuex'
      //dayjs: 'dayjs'
    },
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
    plugins: [new VueLoaderPlugin()],
  },
];
