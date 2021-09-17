import Vue from 'vue';

// 有了 inheritAttrs: false 和 $attrs，你就可以手动决定这些 attribute 会被赋予哪个元素
Vue.component('my-input', {
  inheritAttrs: false, // 不希望组件的根元素继承 attribute
  props: ['label', 'value'],
  template: ` 
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>`
});

/*
  使用
  <my-input
    label="Username:"
    v-model="username"
    required
    placeholder="Enter your username"
  ></my-input>
*/

// 自定义组件 v-model 
// v-model 默认会利用名为 value 的 prop 和名为 input 的事件
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
});

/*
  使用
  <base-checkbox v-model="lovingVue"></base-checkbox>
*/


/* 
  配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素,对于类似 <input> 的你希望它也可以
  配合 v-model 工作的组件来说，为这些监听器创建一个类似下述 inputListeners 的计算属性通常是非常有用的
 
  <base-input> 组件是一个完全透明的包裹器了, 跟它相同的 attribute 和监听器都可以工作，不必再使用 .native 监听器。
 */
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
});