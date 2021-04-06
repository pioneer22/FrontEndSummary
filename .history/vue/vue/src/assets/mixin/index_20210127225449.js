import Vue from 'vue';
let mixin = {
  created () {
    this, hello()
  },

  methods: {
    hello () {
      console.log('hello mixin!')
    }
  }
}