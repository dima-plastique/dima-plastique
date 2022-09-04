<template>
  <button
    class="circl"
    :class="['circl--red', { 'circl--green': checked }]"
    @click="$emit('click-button', [index, title])"
  ></button>
</template>

<script>
export default {
  name: "circl",
  props: {
    index: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.circl {
  width: 20px;
  height: 20px;
  margin-bottom: 10px;
  border-radius: 50%;
  &--red {
    background: red;
  }
  &--green {
    background: chartreuse;
  }
}
</style>
