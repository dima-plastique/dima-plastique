<template>
  <div class="card__heading">
    <div class="card__name">{{ task.title }}</div>
    <div class="card__info">
      <div class="card__level">Уровень: {{ task.level }}</div>
      <div class="card__added">Добавлена: {{ task.date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardHeading",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  &__heading {
    margin-bottom: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__name {
    font-weight: 700;
    font-size: 21px;
    @media (max-width: 992px) {
      margin-bottom: 20px;
    }
  }
  &__info {
    display: flex;
    font-weight: 300;
    font-size: 18px;
  }
  &__level {
    margin-right: 35px;
    font-size: 14px;
  }
  &__added {
    font-size: 14px;
  }
}
</style>
