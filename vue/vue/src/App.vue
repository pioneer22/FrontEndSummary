<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #333;
}
.z-button {
  border-radius: 5px;
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 13px;
  cursor: pointer;
  font-size: 14px;
}
.z-button.button-danger {
  margin-left: 10px;
  background-color: #ff4d4f;
  border-radius: 5px;
  border: solid 1px #ff4d4f;
}
.z-button.button-primary {
  margin-left: 10px;
  background-color: #2079e8;
  border-radius: 5px;
  border: solid 1px #2079e8;
  color: #fff;
}
.z-button.button-default {
  margin-left: 10px;
  background-color: rgb(234, 241, 255);
  border-radius: 5px;
  border: solid 1px rgb(234, 241, 255);
  color: #2e71fb;
}
.z-button.button-reset {
  margin-left: 10px;
  background-color: #faac3d;
  border-radius: 5px;
  border: solid 1px #faac3d;
  color: #fff;
}
.td-icon-wrap{
  display: flex;
  align-items: center;
  .text {
    line-height: 1;
  }
}
</style>
