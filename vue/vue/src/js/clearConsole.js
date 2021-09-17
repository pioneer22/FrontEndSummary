// 配置到vue.config.js中, 实现全区清除console.log
const reg = /(console.log()(.*)())/g;
module.exports = function (source) {
  source = source.replace(reg, '');
  return source;
}