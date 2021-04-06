<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Pioneer
 * @Date: 2021-01-04 22:39:06
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-04 22:39:07
-->
<!--  -->
<template>
  <div class=''>
    <div id="list-demo"
         class="demo"> <button v-on:click="add">Add</button> <button v-on:click="remove">Remove</button>
      <transition-group name="list"
                        tag="p"> <span v-for="item in items"
              v-bind:key="item"
              class="list-item"> {{ item }} </span> </transition-group>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    }
  },
  methods: {

  },
  created () {

  }
}
</script>
<style scoped>
</style>