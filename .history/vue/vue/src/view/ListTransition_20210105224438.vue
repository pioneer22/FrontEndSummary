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
    <div class="container">
      <button @click="show = !show">Toggle show</button>
      <transition name="bounce">
        <p v-if="show">Look at me!</p>
      </transition>
    </div>

    <div class="container">
      <button @click="changeBtn">改变按钮文字</button>
      <transition mode="out-in">
        <button v-bind:key="docState"> {{ buttonMessage }} </button>
      </transition>
    </div>

    <div class="container">
      <input type="radio"
             value="A"
             v-model="picked" />
      <input type="radio"
             value="B"
             v-model="picked" />
      <transition name="component-fade"
                  mode="out-in">
        <component v-bind:is="view"></component>
      </transition>
    </div>

    <div id="list-demo"
         class="demo">
      <button @click="add">Add</button>
      <button @click="remove">Remove</button>
      <transition-group name="list"
                        tag="p">
        <span v-for="item in items"
              :key="item"
              class="list-item">
          {{ item }}
        </span>
      </transition-group>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      show: true,
      docState: '',
      view: 'v-a',
      picked: 'A',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    }
  },

  components: {
    'v-a': { template: '<div>Component A</div>' },
    'v-b': { template: '<div>Component B</div>' }
  },

  methods: {
    changeBtn () {
      let btns = ['saved', 'edited', 'editing'];
      let index = Math.floor(Math.random() * 3);
      this.docState = btns[index]
    },

    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },

    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },

    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    }
  },

  created () {
    this.docState = 'saved'
  },

  computed: {
    buttonMessage: function () {
      switch (this.docState) {
        case 'saved': return 'Edit';
        case 'edited': return 'Save';
        case 'editing': return 'Cancel';
      }
    }
  },

  watch: {
    picked (newVal, oldVal) {
      if (newVal == 'A')
        this.view = 'v-a'
      else
        this.view = 'v-b'
    }
  }
}
</script>
<style scoped>
.container {
  height: 80px;
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

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
</style>