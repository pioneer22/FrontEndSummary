<template>
  <div class='container'>
    <div class="container_item">
      <router-link to="/slot">slot</router-link>
      <router-link to="/trans">transition</router-link>
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
</style>