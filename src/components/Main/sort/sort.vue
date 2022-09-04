<template>
  <div class="sort" v-if="tasks.length !== 0">
    <div class="sort-btn__title">
      Первыми выводить:
    </div>
    <div class="sort-btn__btn">
      <button
        :disabled="tasks.length === 0"
        class="sort-btn__button sort-btn__button--green"
        @click="$emit('filter-checked')"
      >
        Решенные
      </button>
      <button
        :disabled="tasks.length === 0"
        class="sort-btn__button sort-btn__button--red"
        @click="$emit('filter-unchecked')"
      >
        Нерешенные
      </button>
      <button class="btn-search" @click="$emit('search-tasks')">
        <img src="static/loupe.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "sort",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.sort {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 568px) {
    flex-direction: column;
    &__title {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
}
.sort-btn {
  margin-right: 20px;
  display: flex;

  align-items: center;
  @media (max-width: 568px) {
    flex-direction: column;
    justify-content: center;
  }
  &__btn {
    display: flex;
  }
  &__title {
    margin-right: 20px;
    @media (max-width: 568px) {
      margin-bottom: 20px;
    }
  }
  &__button {
    font-family: "Ubuntu";
    padding: 10px 20px;

    background: #fff;
    border-radius: 16px;
    font-size: 16px;

    transition: all 0.22s;
    margin-right: 10px;
    box-shadow: 0 4px 13px rgb(0 0 0 / 5%);

    &:hover {
      cursor: pointer;

      box-shadow: 0 10px 13px rgb(0 0 0 / 10%);
    }

    &--green {
      color: green;
    }
    &--red {
      color: red;
    }
  }
}
.btn-search {
  background: transparent;
  width: 20px;
}
</style>
