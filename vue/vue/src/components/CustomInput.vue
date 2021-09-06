<template>
  <div>
    <input type="checkbox" :checked="checked" @change="test" />
  </div>
</template>

<script>
export default {
  props: ["checked"],
  model: {
    props: "checked",
    event: "change",
  },
  methods: {
    test(e) {
      this.$emit("change", e.target.checked);
    },
  },
};
</script>

<style lang="scss" scoped></style>
