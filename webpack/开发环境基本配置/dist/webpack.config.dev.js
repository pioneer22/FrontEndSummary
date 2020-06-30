"use strict";

var _require = require("path"),
    resolve = _require.resolve;

var HtmlWebpackPlugin = require("html-webpack-plugin"); // 提取CSS文件


var MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 压缩CSS文件


var OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); // process.env.NODE_ENV = "development"


module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [// 创建style标签，将样式放入
      // 'style-loader',
      // 这个loader取代style-loader。作用：提取js中的CS成单独文件
      MiniCssExtractPlugin.loader, // 将CSS文件整合到js文件中
      'css-loader',
      /* 
        CSS兼容性处理： postcss--> postcss-loader postcss-preset-env
        帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的CSS兼容性样式
           "browserslist": {
            "development": [
              "last 1 chrome version",
              "last 1 firefox version",
              "last 1 safari version"
            ],
              "production": [
              ">0.2%",
              "not dead",
              "not op_mini all"
            ]
          }
      */
      // 修改loader的配置
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: function plugins() {
            return [// postcss的插件
            require("postcss-preset-env")()];
          }
        }
      }]
    },
    /* 
      语法检查： eslint-loader  eslint
      注意： 只检查自己的源代码,第三方的库是不用检查的
      设置检查规则：
        package.json中eslintConfig中的设置~
        "eslintConfig":{
          "extends": "airbnb-base"
        }
        airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
    */

    /* {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
      options: {
        // 自动修复eslint错误
        fix: true
      }
    }, */
    {
      /* 
        js兼容性处理： babel-loader @babel/core @babel/preset-env
        1. 基本js兼容性处理 --> @babel/preset-env
           只能转换基本语法，如promise语法不能转换
        2. 全部js兼容性处理 --> @babel/polyfill
           只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大
        3. 需要做兼容性处理的就做：按需加载 --> core- js
      */
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        // 预设： 指示babel做怎样的兼容性处理
        presets: [['@babel/preset-env', {
          // 按需加载
          useBuiltIns: 'usage',
          // 指定core-js版本
          corejs: {
            version: 3
          },
          // 指定兼容性做到哪个版本浏览器
          targets: {
            chrome: '60',
            firefox: '60',
            ie: '9',
            safari: '10',
            edge: '17'
          }
        }]]
      }
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    // 压缩html代码
    minify: {
      // 移除空格
      collapseWhitespace: true,
      // 移除注释
      removeComments: true
    }
  }), new MiniCssExtractPlugin({
    // 对输出CSS文件进行重命名
    filename: 'css/build.css'
  }), // 压缩CSS
  new OptimizeCssAssetsWebpackPlugin()],
  // production生产环境下会自动压缩js代码
  mode: 'development'
};