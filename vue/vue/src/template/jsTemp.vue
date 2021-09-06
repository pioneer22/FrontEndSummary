<template>
  <div class="index-container">
      <router-view />
  </div>
</template>

<script>
import jsRoutes from "@/router/js.js";
export default {
  data() {
    return {
      urls: [],
    };
  },
  methods: {
    turnRoute(event, path) {
      this.$router.push(path);
    },
  },
  created() {
    this.urls = jsRoutes.map((item, index) => item.path);
  },
};
</script>

<style lang="scss" scoped>
  .index-content {
    height: calc(100vh - 54px);
    padding: 10px;
    overflow-y: scroll;
    width: 100%;
  }
</style>
