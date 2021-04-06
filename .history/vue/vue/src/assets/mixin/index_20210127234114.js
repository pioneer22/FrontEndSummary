import Vue from 'vue';

// 1.以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。
// 定义一个混合对象
let mixin_1 = {
  methods: {
    hello () {
      alert('hello mixin_1!')
    }
  }
}

// 定义一个使用混合对象的组件
let Component = Vue.extend({
  mixins: [mixin_1],
  template: `<div @click='hello'>mixin_1</div>`
})
Vue.component('mixinComponent', Component);


export let mixin_2 = {
  created () {
    console.log("mixin 2!")
  },
  methods: {
    showMixin () {
      alert('hello mixin_2!')
    }
  }
}



