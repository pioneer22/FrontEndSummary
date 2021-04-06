<template>
  <div class=''>
    <slot-layout>
      <div slot="header">这是具名挖槽</div>
      <div>这是不具名挖槽</div>
    </slot-layout>
  </div>
</template>

<script>
import SlotLayout from '@/components/SlotLayout';
import SlotLayout from '../components/SlotLayout.vue';
export default {
  components: { SlotLayout },
  data () {
    return {

    }
  },
  methods: {

  },
  created () {

  },
  component: {
    SlotLayout
  }
}
</script>
<style scoped>
</style>