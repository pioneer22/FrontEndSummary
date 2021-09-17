const path = require('path');

// vue.config.js的主体配置
module.exports = {
  // publicPath: '/work-items/electron-work',
  publicPath: './',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  css: {
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)
    extract: process.env.NODE_ENV === 'production' ? true : false,
    // 是否为 CSS 开启 source map
    sourceMap: true,
    // 样式预加载设置
    loaderOptions: {
      sass: {}
    }
  },
  devServer: {
    port: 8088,
    open: true
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /.vue$/,
          exclude: /node_modules/,
          loader: path.resolve(__dirname, './src/js/clearConsole.js')
        },
        {
          test: /.js$/,
          exclude: /node_modules/,
          loader: path.resolve(__dirname, './src/js/clearConsole.js')
        }
      ]
    }
  }
};
