
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const WorkboxWebpackPlugin = require("workbox-webpack-plugin")

module.exports = {
  entry: './src/js/index.js',
  output: {
    // [name]: 取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),

    new WorkboxWebpackPlugin.GenerateSW({
      /* 
        1.帮助serviceworker快速启动
        2.删除旧的serviceworker

        生成一个serviceworker配置文件~
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ],

  /* 
    可以将node_modules中代码单独打包一个chunk最终输出
    自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  mode: 'production',

  /*
    // 通过cdn方式引入即可
   externals: {
    // 拒绝jQuery被打包进来
    jquery: 'jQuery'
   } 
  */
}

/*
  PWA: 渐进式网络开发应用程序（离线可访问）
  workbox -->  workbox-webpack-plugin
*/