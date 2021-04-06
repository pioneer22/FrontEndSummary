import Vue from 'vue';

// 定义一个混合对象
let mixin = {
  created () {

  },

  methods: {
    hello () {
      console.log('hello mixin!')
    }
  }
}

// 定义一个使用混合对象的组件
let Component = Vue.extend({
  mixins: [mixin],
  template: `<div @click='hello'>mixin</div>`
})

Vue.component('mixinComponent', Component);

