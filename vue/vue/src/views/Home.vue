<template>
  <div class='container'>
    <div class="container_item">
      <router-link to="/slot"
                   class="link">slot</router-link>
      <router-link to="/transition"
                   class="link">transition</router-link>
      <router-link to="/mixin"
                   class="link">mixin</router-link>

      <el-button type="primary"
                 size="small">button</el-button>
    </div>
  </div>
</template>

<script>
export default {
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
}

.container_item {
  display: flex;
  align-items: center;
}

.link {
  text-decoration: none;
  display: block;
  padding: 0px 20px;
  border-radius: 10px;
  background-color: orange;
  color: white;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 20px;
}

.link:hover {
  background-color: orangered;
}
</style>