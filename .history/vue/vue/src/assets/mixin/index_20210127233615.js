import Vue from 'vue';

// 定义一个混合对象
let mixin_1 = {
  methods: {
    hello () {
      alert('hello mixin!')
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
  methods: {
    hello () {
      alert('hello mixin!')
    }
  }
}



