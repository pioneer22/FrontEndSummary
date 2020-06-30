/*  
  webpack入口起点文件
  1.运行指令
    开发环境： webpack ./src/index.js -o ./build/build.js --mode=development
    webpack会以  ./src/index.js 为入口文件开始打包，打包后输出到 ./build/build.js 
    整体打包环境,是开发环境

    生产环境：webpack ./src/index.js -o ./build/build.js --mode=production
    webpack会以  ./src/index.js 为入口文件开始打包，打包后输出到 ./build/build.js 
    整体打包环境,是开发环境

  2.结论：
    1.webpack能处理js/json,不能处理css/img等其它资源
    2.生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化~
    3.生产环境比开发环境多一个压缩js代码 
*/

import data from "./data.json"

// 引入样式资源
import './css/index.css'
import './css/index.less'
import './font/iconfont.css'

import print from './js/print.js'

console.log(data)

print()

if(module.hot){
  // 一旦module.hot为true, 说明开启了HMR功能。 -->  让HMR功能代码生效
  module.hot.accept('./js/print.js',function(){
    // 方法会监听print.js文件的变化，一旦发生变化其它模块不会重新打包构建
    // 会执行后面的回调函数
    print()
  })
}