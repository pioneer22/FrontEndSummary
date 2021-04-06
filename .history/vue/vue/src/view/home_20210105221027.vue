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
          &ltslot-layout&gt
          &ltdiv slot="header"&gt这是具名挖槽&lt/div&gt
          &ltdiv&gt
          &ltp&gt这是不具名挖槽&lt/p&gt
          &ltp&gt不具名挖槽的内容&lt/p&gt
          &lt/div&gt
          &lt/slot-layout&gt
        </xmp>
      </div>
    </div>

    <!--  <div>
      <button @click="show=!show">Toggle</button>
      <transition name="fade">
        <p v-if="show">qwertyuiopasdfghjklzxcvbnm</p>
      </transition>
    </div> -->

    <div>
      <router-link to="/trans">transition</router-link>
    </div>
  </div>
</template>

<script>
import SlotLayout from '@/components/SlotLayout';
export default {
  components: {
    SlotLayout
  },
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

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
} */

.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter,
.fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

/* ----------------------------------- */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}

/* -------------------------------------- */
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-active {
  opacity: 0;
}
</style>