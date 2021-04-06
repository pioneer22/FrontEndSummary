<!--  -->
<template>
  <div class='container'>
    <mixin-component></mixin-component>
    <div @click="showMixin">mixin_2</div>
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