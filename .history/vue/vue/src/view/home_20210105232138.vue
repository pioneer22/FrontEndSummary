<template>
  <div class='container'>
    <div class="container_item">
      <router-link to="/slot"
                   class="link">slot</router-link>
      <router-link to="/trans"
                   class="link">transition</router-link>
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
  padding: 10px 20px;
  border-radius: 10px;
  background-color: orange;
  color: white;
  margin-right: 20px;
}
</style>