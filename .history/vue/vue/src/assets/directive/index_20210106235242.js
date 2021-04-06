import Vue from 'vue';

/*全局自定义指令  */
Vue.directive('focus', {
  // 当绑定元素插入到DOM中
  inserted: function (el) {
    // 聚集元素
    el.focus()
  }
})