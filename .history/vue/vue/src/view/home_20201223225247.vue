<template>
  <div class='container'>
    <div class="container_item">
      <slot-layout>
        <div slot="header">这是具名挖槽</div>
        <div>
          <p>这是不具名挖槽</p>
          <p>不具名挖槽的内容</p>
        </div>
      </slot-layout>

      <div>
        <xmp>
          &ltslot-layout &gt
          &lt div slot="header" &gt 这是具名挖槽 &lt /div &gt
          &lt div>
          &lt p>这是不具名挖槽 &lt /p &gt
          &lt p>不具名挖槽的内容 &lt /p &gt
          &lt /div &gt
          &lt /slot-layout &gt
        </xmp>
      </div>
    </div>

  </div>
</template>

<script>
import SlotLayout from '@/components/SlotLayout';
export default {
  components: { SlotLayout },
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
}
</style>