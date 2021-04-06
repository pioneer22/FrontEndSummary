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

// 当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合。比如，同名钩子函数将混合为一个数组，因此都将被调用。
export let mixin_2 = {
  created () {
    console.log("mixin 2!")
  },
  methods: {
    showMixin () {
      alert('hello mixin_2!')
    },
    onflicting () {
      alert("mixin_2的conflicting函数~")
    }
  }
}



