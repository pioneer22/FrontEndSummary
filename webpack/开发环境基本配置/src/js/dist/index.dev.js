"use strict";

require("../css/a.css");

require("../css/b.css");

// import '@babel/polyfill'
var add = function add(a, b) {
  return a + b;
}; // 下一行eslint所有规则都失效（下一行不进行eslint检察）
// eslint-disable-next-line


console.log(add(2, 3));
var promise = new Promise(function (resolve) {
  setTimeout(function () {
    console.log("promise");
    resolve();
  }, 1000);
});
console.log(promise);