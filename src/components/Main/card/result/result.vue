<template>
  <div class="result">
    <div class="result__title">Пример кода:</div>
    <ul class="result__list">
      <li class="result__item" v-for="(item, idx) in task.result" :key="idx">
        <code>{{ item }}</code>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "result",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.result {
  padding: 15px;
  background-color: rgba(223, 219, 219, 0.384);
  border-radius: 10px;
  @media (max-width: 568px) {
    overflow: auto;
    &__item {
      width: 1000px;
      font-size: 14px;
      line-height: 1.4;
    }
  }
  &__title {
    margin-bottom: 30px;
    font-weight: 300;
    font-size: 20px;
  }

  &__item {
    font-size: 16px;
    line-height: 1.5;
  }
}
</style>
