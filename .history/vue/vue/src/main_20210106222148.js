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
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\w+/g, '-')
      .replace(/(^\-|\-$)/g, '');
    return createElement(
      'h' + this.level, // tag name 标签名
      [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId,
          }
        }, this.$slots.default)
      ]
    )
  },
  props: {
    level: {
      type: Number,
      // required: true,
      default: 1
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
