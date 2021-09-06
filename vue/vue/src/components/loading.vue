<template>
  <transition name="custom-loading-fade">
    <div class="loading-box" v-show="visible">
      <div>
        <p class="loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      visible: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.loading-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  .loading-text {
    color: white;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
