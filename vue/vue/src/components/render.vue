<script>
export default {
  data() {
    return {};
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
  },

  // 使用 render 重写上面例子
  render(createElement) {
    /**
     * 第一个参数, 要渲染的html标签
     * 第二个参数, 可选: {Object}, html标签各种属性, { class:  ,style: , domProps: {innerHTML: ''}, attrs: {id: ''} }
     * 第三个参数, 可选: {String | Array}, 虚拟子节点, 当前html标签子元素, [createElement()]
     */
    return createElement("h" + this.level, this.$slots.default);
  },
};
</script>

<style lang="scss" scoped></style>
