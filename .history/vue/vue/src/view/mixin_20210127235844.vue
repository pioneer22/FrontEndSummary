<!--  -->
<template>
  <div class='container'>
    <mixin-component></mixin-component>
    <div @click="showMixin">mixin_2</div>
    <div @click="onflicting">mixin对象键名冲突</div>

    <p>全局混入</p>
    <pre>
      Vue.mixin({  
        created: function () {   
           XXXXX 
        }
      })
    </pre>

    <p>自定义选项策略</p>
    <pre>
      Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {  
        // return mergedVal
      }
    </pre>
  </div>
</template>

<script>

import { mixin_2 } from '@/assets/mixin/index'
export default {
  mixins: [mixin_2],
  data () {
    return {

    }
  },
  methods: {
    onflicting () {
      alert("mixin的conflicting函数~")
    }
  },
  created () {
    console.log('mixin')
  }
}
</script>
<style scoped>
.container {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>