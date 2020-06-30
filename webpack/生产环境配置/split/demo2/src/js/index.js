import $ from 'jquery'

/* 
  1.eslint不认识window,navigator全局变量
  解决：需要修改package.json中eslintConfig配置
  "env": {
    "browser": true // 支持浏览器端全局变量
  }

  2.sw代码必须运行在服务器上
    --> 
      npm i serve -g
      serve -s build 启动服务器，将build下所有资源作为静态资源暴露出去。
*/
// 注册serviceworker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log("sw注册成功~")
      })
      .catch(() => {
        console.log("sw注册失败了~")
      })
  })
}

/* 
  通过js代码, 让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
*/

// import(/* webpackChunkName: 'test' */'./test')
//   .then(({ add }) => {
//     // "文件加载成功~~"
//     console.log(add(2, 3))
//   })
//   .catch(() => {
//     console.log("文件加载失败~~")
//   })

function mul(a, b) {
  return a * b;
}

console.log($)

document.getElementById('btn').onclick = function () {
  //懒加载~ 当文件需要使用时才加载~
  //预加载：prefetch: 提前记载js文件，等其它资源加载完毕，浏览器空闲了再偷偷加载资源
  //正常加载可以认为是并行加载（同一时间加载多个文件）
  import(/* webpackChunkName: 'test', webpackPrefetch:true */'./test').then(({ mul }) => {
    console.log(mul(4, 5))
  })
}