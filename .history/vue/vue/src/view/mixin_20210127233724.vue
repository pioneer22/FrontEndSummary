<!--  -->
<template>
  <div class='container'>
    <mixin-component></mixin-component>
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

  },
  created () {

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