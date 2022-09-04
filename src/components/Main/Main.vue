<template>
  <main class="main">
    <Sort
      :tasks="tasks"
      @filter-checked="$emit('filter-checked')"
      @filter-unchecked="$emit('filter-unchecked')"
      @search-tasks="$emit('search-tasks')"
    />
    <Card :tasks="tasks" @click-button="$emit('click-button', $event)" />
  </main>
</template>

<script>
import Sort from "@/components/Main/sort/sort";
import Card from "@/components/Main/card/card";

export default {
  name: "Main",
  components: {
    Sort,
    Card,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 568px) {
  .main {
    padding: 0px 5px;
  }
}
</style>
