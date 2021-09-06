<template>
  <div>
      <pre>
          1. 项目较大, git clone 比较慢, 甚至会失败
          可通过加上--depth, 让其只下载一个commit, 内容少很多, 加快的速度
          下载下来的内容可以继续提交新的commit, 创建新的分支。只是不能切换到历史commit和历史分支。
          例： git clone https://github.com/microsoft/TypeScript ts
          ==>  git clone https://github.com/microsoft/TypeScript --depth=1 ts

      </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
