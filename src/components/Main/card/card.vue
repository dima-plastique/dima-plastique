<template>
  <div class="overlay">
    <div class="card" v-for="(task, index) in tasks" :key="index">
      <Circl
        :index="index"
        :title="task.title"
        :checked="task.checked"
        @click-button="$emit('click-button', $event)"
      />
      <CardHeading :task="task" />
      <Task :text="task.text" />
      <img
        class="image"
        :src="task.img"
        alt="демонстрационная картинка"
        v-if="task.img"
      />
      <Result v-if="task.result" :task="task" />
    </div>
  </div>
</template>

<script>
import Circl from "@/components/Main/card/circl/circl";
import CardHeading from "@/components/Main/card/CardHeading/CardHeading";
import Task from "@/components/Main/card/task/task";
import Result from "@/components/Main/card/result/result";

export default {
  name: "card",
  components: {
    Circl,
    CardHeading,
    Task,
    Result,
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
.image {
  margin-bottom: 20px;

  display: block;
}

.card {
  margin-bottom: 40px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.336);
  border-radius: 10px;

  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.11);
  @media (max-width: 992px) {
    &__heading {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  @media (max-width: 568px) {
    &__name {
      font-size: 20px;
    }
    &__level {
      margin-right: 14px;
    }
  }
}
.overlay {
  position: relative;
}

.current-tasks {
  position: fixed;
  bottom: 100px;
  right: 100px;

  width: 150px;
  height: 150px;
  padding-top: 20px;

  background: #fbf3e5;

  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.35);
  &__title {
    margin-bottom: 20px;
  }
  &__number {
    font-size: 60px;
    text-align: center;

    color: green;
  }
}

.share-solution {
  text-align: right;
  margin-top: 20px;
  &__link {
    color: #b3b0b0;
    font-size: 14px;
    &:hover {
      color: #706c6c;
    }
  }
}
</style>
