// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

let getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children ? getChildrenTextContent(node.children) : node.text;
  }).join('');
}

Vue.component('heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level, // tag name 标签名
      this.$slots.default // 子组件中的阵列
    )
  },

  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
