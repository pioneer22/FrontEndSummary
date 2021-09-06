<template>
  <div>{{content}}</div>
</template>

<script>
export default {
  name: "propChild",
  inject: ['foo'],
  props: {
      content: {
          type: String,
          default: 'test prop'
      }
  },
  created(){
    console.log("依赖注入器, 无论组件层次有多深:", this.foo);
  }
};
</script>

<style lang="scss" scoped>

</style>
