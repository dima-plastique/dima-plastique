<template>
  <header class="header">
    <div class="quiz-block">
      <button class="quiz-block__button" @click="$emit('click-quiz')">
        Тесты
      </button>
    </div>
    <h1 class="header__title">Задачи для самостоятельного изучения</h1>

    <div class="complexity">
      <h3 class="complexity__title">Выберите сложность:</h3>
      <ul class="complexity__list">
        <li
          v-for="(item, index) in linkName"
          :class="['complexity__item', { isActive: index === isActiveLink }]"
          :key="index"
          @click="$emit('click-link', index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    linkName: {
      type: Array,
      required: true,
    },
    isActiveLink: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  background: #0011ff;
  min-height: 200px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 17px 0px;

  color: #fff;
  &__title {
    margin-bottom: 17px;
    font-weight: 700;
    font-size: 40px;

    line-height: 1.2;
  }
  &__subtitle {
    font-family: "Roboto-light", sans-serif;
  }
}

.quiz-block {
  position: absolute;
  top: 10px;
  right: 10px;
  align-self: flex-end;
  margin-right: 20px;
  &__button {
    background: transparent;
    color: #fff;
    font-size: 16px;
    font-weight: 700;

    margin-bottom: 10px;
    font-family: "Segoe UI";

    &:hover {
      color: #fde89c;
    }
  }
}

.chat {
  display: flex;
  align-items: center;

  margin-bottom: 25px;

  font-size: 18px;
  font-weight: 400;
  &__text {
    margin-right: 5px;
  }
  &__link {
    position: relative;

    color: #fff;

    transition: all 0.4s linear;
    &:hover {
      text-decoration: none;
      &:before {
        width: 100%;
        left: 0;
        background: #fff;
      }
    }
    &:before {
      content: "";
      width: 0;
      height: 2px;
      position: absolute;
      bottom: -10px;
      left: 50%;

      transition: all 0.3s;
    }
  }
}

.complexity {
  display: flex;
  align-items: center;

  &__title {
    margin-right: 16px;
    font-size: 18px;
  }
  &__list {
    display: flex;
  }
  &__item {
    padding: 10px;
    border: 1px solid #ffec7f;
    border-radius: 5px;

    background: transparent;
    font-family: "Segoe UI";
    color: #ffec7f;

    cursor: pointer;
    transition: all 0.2s linear;
    &:not(:last-child) {
      margin-right: 25px;
    }
    &:hover {
      color: #fff;
      border-color: #fff;
    }
  }
  .isActive {
    color: #fff;
    border-color: #fff;
  }
}

@media (max-width: 568px) {
  .header {
    &__title {
      font-size: 32px;
    }
  }
  .complexity {
    flex-direction: column;
    text-align: center;
    &__title {
      margin-bottom: 15px;
    }
  }
  .chat {
    font-size: 14px;
  }
}
</style>
