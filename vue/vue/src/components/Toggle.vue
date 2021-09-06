<template>
  <div>
    <div v-if="show">显示和隐藏组件</div>
    <button @click="hideComp">显隐组件</button>
  </div>
</template>

<script>
export default {
  props: ["show"],
  methods: {
    hideComp() {
      let show = !this.show;
      this.$emit("update:show", show);
    },
  },
};
</script>

<style lang="scss" scoped></style>
