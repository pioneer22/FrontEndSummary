<template>
  <div id="bottom">
    <span>{{ title }}</span>
    <span>{{ computed }}</span>

    <prop-child></prop-child>
    <div v-if="$slots.default" class="slot-default">
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
import propChild from "@/components/propChild.vue";
const propChilds = {};

Object.keys(propChild.props).forEach((key, val) => {
  propChilds[key] = val;
});

export default {
  name: "propValidator",
  columns: 3,
  props: {
    ...propChilds,
    title: {
      type: String,
      validator: (s) => ["square", "rounded"].includes(s),
    },

    computed: {
      type: Number,
      default: 0,
    },

    content: {
      type: Object,
      require: true,
    },
  },

  created() {
    // 通过特殊的$options属性从组件内部访问元数据
    console.log(`Using ${this.$options.columns} columns`);
  },

  components: {
    propChild,
  },

  mounted() {
    let _self = this;
    // MutationObserver接口提供了监视对DOM树所做更改的能力。当有变化时调用update
    const observer = new MutationObserver(this.update);
    let box = document.querySelector("#bottom");
    // 监听此组件的变化
    observer.observe(box, {
      attributes: true,
      subtree: true,
      childList: true,
    });

    box.style.color = "cornflowerblue";
  },

  methods: {
    update() {
      console.log("update~");
    },

    setRef(){
      console.log("setRef~");
    }
  },
};
</script>

<style lang="scss" scoped>
.slot-default {
  background: cornflowerblue;
  color: white;
}
</style>
