<template>
  <div>
    <slot :item="list[0]">
      <!--default-->
      {{ list[0] }}
    </slot>

    <v-for v-if="list.length > 1" :list="list.slice(1)">
      <template v-slot="{ item }">
        <slot :item="item" />
      </template>
    </v-for>
  </div>
</template>

<script>
export default {
  name: "VFor",
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  }
};
</script>

<style lang="scss" scoped></style>
