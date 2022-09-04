<template>
  <div class="pagination">
    <button
      v-for="(item, index) in quantityPages"
      :key="index"
      :class="[
        'pagination__button',
        { 'pagination__button--active': isActivePagination === item },
      ]"
      @click="$emit('page-num', item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    quantityPages: {
      type: Number,
      required: true,
    },
    isActivePagination: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
  @media (max-width: 568px) {
    justify-content: center;
  }
  &__button {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.459);
    border-radius: 4px;
    padding: 10px;
    @media (max-width: 568px) {
      padding: 8px;
    }
    &:not(:last-child) {
      margin-right: 5px;
    }
    &:hover {
      background: rgba(192, 189, 189, 0.568);
    }
    &--active {
      background-color: rgba(248, 203, 0, 0.562);
    }
  }
}
</style>
