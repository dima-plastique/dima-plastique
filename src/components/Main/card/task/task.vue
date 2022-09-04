<template>
  <div class="task" v-text="text"></div>
</template>

<script>
export default {
  name: "task",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  margin-bottom: 30px;
  font-size: 16px;

  font-family: "Segoe UI-Regular";
  font-weight: 400;
  line-height: 1.4;
  @media (max-width: 568px) {
    line-height: 1.5;
  }
}
</style>
