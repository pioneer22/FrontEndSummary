import Vue from 'vue';

/*全局自定义指令  */
Vue.directive('focus', {
  inserted: function (el) {
    // 聚集元素
    el.focus()
  }
})