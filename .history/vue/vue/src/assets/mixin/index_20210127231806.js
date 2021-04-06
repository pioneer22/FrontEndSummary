import Vue from 'vue';

// 定义一个混合对象
let mixin = {
  created () {
    this.hello()
  },

  methods: {
    hello () {
      console.log('hello mixin!')
    }
  }
}

// 定义一个使用混合对象的组件
let Component = Vue.extend({
  mixins: [mixin]
})

let mixinComponent = new Component()
Vue.component('mixinComponent', mixinComponent)

