/* 
  webpack.config.js  webpack的配置文件
  运行webpack指令时，会加载里面的配置

  所有构建工具都是基于node.jsp平台运行的~模块化默认采用common.js
*/

/* 
  loader: 1.下载  2.使用（配置loader）
  plugins: 1.下载  2.引入  3.使用
*/

// 用resolve来拼接绝对路径的方法
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // webpack配置
  // 入口起点
  entry: ['./src/index.js', './src/index.html'],
  // 输出
  output: {
    // 输出文件名
    filename: 'js/build.js',
    // 输出路径, __dirname代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader的配置     
      // 不同文件必须配置不同的loader处理
      {
        // 配置哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        // 要使用多个loader处理用use
        use: [
          // use数组中的loader执行顺序，从下到上，从右到左
          // 创建style标签,将js中的样式资源进行插入，添加到head中生效
          "style-loader",
          // 将css文件变成commonJs模块加载js中，里面内容是样式字符串
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 将less文件编译成css文件
          "less-loader"
        ]
      },
      {
        // 处理图片资源
        // 问题： 默认处理不了html中img图片
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载url-loader, file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb, 就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度会更慢）
          limit: 8 * 1024,

          // 问题： 因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出现问题： [object Module]
          // 解决： 关闭url-loader 的es6模块化， 使用commonjs解析
          // esModule: false,

          // 给图片进行重命名
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来拓展名
          name: '[hash:10].[ext]',
          // 输出到imgs文件
          outputPath: 'imgs'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img,从而能被url-loader进行处理）
        loader: 'html-loader'
      },
      /* {
        // 打包其它资源
        // 排除css/js/html资源
         exclude: /\.(css|js|html)$/,
         loader: 'file-loader',
         options: {
           name: '[hash:10].[ext]'
         }
      }, */
      {
        test: /\.(eot|woff|svg|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }

      }

    ]
  },

  // plugins 的配置
  plugins: [
    // 详细plugins的配置
    // html-webpack-plugin
    // 功能： 默认创建一个空的HTML,自动引入打包输出的所有资源（JS/CSS）
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    })
  ],

  // mode: 'production'
  mode: 'development',

  // 开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~）
  // 只会在内容中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
  // 安装包 webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启用gzip压缩
    compress: true,
    // 端口号
    port: 3333,
    // 自动打开浏览器
    open: true,
    /*  
      开启HMR功能
      HMR:hot module replacement 热模块替换
      作用： 一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
      极大提升了构建速度

      样式文件： 可以使用HMR功能： 因为style-loader内部实现了~
      js文件： 默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js的处理，只能处理非入口文件的其它js文件
      html文件： 默认不能使用HMR功能，同时会导致问题：html文件不能热更新了~(不用做HMR文件)
        解决：修改entry入口，将html文件引入
    */
    // 当修改了webpack配置，新配置要想生效，必须重启webpack服务
    hot: true
  },

  devtool: 'source-map'
}