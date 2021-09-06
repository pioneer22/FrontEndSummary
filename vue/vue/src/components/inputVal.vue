<template>
  <div>
      <p>自定义组件中, v-model默认会利用名为value的prop和名为input的事件。</p>
      <span @click="test1()">{{value}}</span>
  </div>
</template>

<script>
export default {
  props: {
      value: String
  },

  methods: {
      test1(){
          this.$emit('input', new Date())
      }
  }
};
</script>

<style lang="scss" scoped>
  span{
    cursor: pointer;
    color: red;
    font-weight: bold;
  }
</style>
