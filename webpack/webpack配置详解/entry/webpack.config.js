const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* 
  entry: 入口起点
    1. string --> './src/js/index.js'
      打包形成一个chunk。 输出一个bundle文件。
      此时chunk的名称默认是main
    2. array --> ['./src/js/index.js','./src/js/add.js']
      多入口
      所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件
       --> 只有在HMR功能中让html热更新失效~
    3. object --> { index: ./src/js/index.js',add: './src/js/add.js' }
      多入口
      有几个入口文件就形成几个chunk, 输出几个bundle文件。
      此时chunk的名称是 key

      --> 特殊用法
      {
        // 所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件
        index: ['./src/js/index.js','./src/js/add.js'],
        // 形成一个chunk, 输出一个bundle文件
        add: './src/js/add.js'
      }
*/

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build')
  },

  module: {
    rules: [

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],

  mode: 'development'

}