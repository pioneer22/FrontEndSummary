<template>
  <div class=''>
    <slot-layout>
      <div slot="header">这是具名挖槽</div>
      <div>
        <p>这是不具名挖槽</p>
        <p>不具名挖槽的内容</p>
      </div>
    </slot-layout>
  </div>
</template>

<script>
// import SlotLayout from '@/components/SlotLayout';
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
    SlotLayout: import('@/components/SlotLayout')
  }
}
</script>
<style scoped>
</style>