let getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children ? getChildrenTextContent(node.children) : node.text;
  }).join('');
}

Vue.component('heading', {
  render: function (createElement) {
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^\-|\-$)/g, '');
    return createElement(
      'h' + this.level, // tag name 标签名
      [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId,
          }
        }, this.$slots.default)
      ]
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})