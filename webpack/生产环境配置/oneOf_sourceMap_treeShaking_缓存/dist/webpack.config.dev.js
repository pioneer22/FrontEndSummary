"use strict";

var _require = require('path'),
    resolve = _require.resolve;

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

var HtmlWebpackPlugin = require("html-webpack-plugin"); // 定义nodejs环境变量：决定使用browserslist的哪个环境


process.env.NODE_ENV = 'production'; // 复用loader

var commonCssLoader = [MiniCssExtractPlugin.loader, 'css-loader', {
  // 还需要在package.json中定义browserslist
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: function plugins() {
      return [require('postcss-preset-env')()];
    }
  }
}];
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [].concat(commonCssLoader)
    }, {
      test: /\.less$/,
      use: [].concat(commonCssLoader, ['less-loader'])
    },
    /* 
      正常来讲，一个文件只能被一个loader处理。
      当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
      先执行eslint, 再执行babel
    */
    {
      // 还需要在package.json中定义eslintConfig --> airbnb
      test: /\.js$/,
      exclude: /node_modules/,
      // 优先执行
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        fix: true
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', {
          useBuiltIns: 'usage',
          corejs: {
            version: 3
          },
          targets: {
            chrome: '60',
            firefox: '60'
          }
        }]
      }
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'url-loader',
      options: {
        limit: 8 * 1024,
        name: '[hash:10].[ext]',
        outputPath: 'imgs',
        esModule: false
      }
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      exclude: /\.(js|css|less|html|jpg|png|gif)/,
      loader: 'file-loader',
      options: {
        outputPath: 'media',
        name: '[hash:10].[ext]'
      }
    }]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'css/build.css'
  }), new OptimizeCssAssetsWebpackPlugin(), new HtmlWebpackPlugin({
    template: './src/index.html',
    minify: {
      collapseWhitespace: true,
      removeComments: true
    }
  })],
  mode: 'production'
};