<template>
  <div class="quiz__wrapper">
    <div class="quiz" v-if="!isFinished">
      <div class="quiz__inner">
        <div class="heading">
          <button class="heading__button" @click="$emit('click-tasks')">
            Назад
          </button>
          <div class="heading__title">Тестирование</div>
        </div>
        <div class="img-box">
          <img
            class="img-box__image"
            v-if="sortArray[currentQuestion].img"
            :src="sortArray[currentQuestion].img"
            alt=""
          />
          <img
            class="img-box__placeholder"
            v-if="sortArray[currentQuestion].alternate"
            :src="sortArray[currentQuestion].alternate"
            alt=""
          />
        </div>
        <div class="number-question">
          {{ currentQuestion + 1 }} из {{ sortArray.length }}
        </div>
        <div class="question">{{ sortArray[currentQuestion].question }}</div>
        <ul class="question-list">
          <li
            v-for="(item, index) in sortArray[currentQuestion].answers"
            :class="[
              'question-list__item',
              answer ? addClass(answer[item.id]) : null,
            ]"
            :key="index"
            @click="() => onAnswerQuestion(item.id)"
          >
            {{ item.text }}
          </li>
        </ul>
        <div class="help">
          <a href="#" class="help__link">Нашли ошибку? Сообщите нам</a>
        </div>
      </div>
    </div>
    <div class="finished" v-if="isFinished">
      <button class="heading__button" @click="$emit('click-tasks')">
        Назад
      </button>
      <img
        class="finished__img"
        src="/static/img/svg/thumbs-up.svg"
        alt=""
        v-if="classFinished.success"
      />
      <img
        class="finished__img"
        src="/static/img/svg/cancel.svg"
        alt=""
        v-if="!classFinished.success"
      />
      <div class="finished__title">{{ textFinished }}</div>
      <div class="finished__right-answer">
        Правильных ответов: {{ this.rightAnswer }}
      </div>
      <div class="finished__false-answer">Ошибок: {{ this.falseAnswer }}</div>
      <div class="finished__percent">
        Процент правильных ответов: {{ precentAnswerRight }}%
      </div>
      <button class="finished__button" @click="repeatQuiz">
        Попробовать еще раз
      </button>
    </div>
  </div>
</template>

<script>
import quiz from "@/questions.js";

export default {
  name: "Quiz",

  props: {
    activeQuiz: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      quiz,
      isFinished: false,
      currentQuestion: 0,
      answer: null,
      rightAnswer: 0,
      falseAnswer: 0,
    };
  },
  methods: {
    onAnswerQuestion(id) {
      const answer = this.answer;

      if (answer) {
        const key = Object.keys(answer)[0];
        if (answer[key] === "success") {
          return;
        }
      }

      const quiz = this.sortArray;
      const curQuestion = this.currentQuestion;

      if (quiz[curQuestion].rightAnswerID === id) {
        this.questionSuccess(id);
        this.rightAnswer += 1;

        const timeout = window.setTimeout(this.nexQuestion, 1000, timeout);
      } else {
        this.questionError(id);
        this.falseAnswer += 1;
        const timeout = window.setTimeout(this.nexQuestion, 1000, timeout);
      }
    },
    nexQuestion(timeOut) {
      if (this.quizFinished) {
        this.isFinished = true;
      } else {
        this.answer = null;
        this.currentQuestion++;
      }
      window.clearInterval(timeOut);
    },
    addClass(id) {
      return id ? id : null;
    },
    questionSuccess(id) {
      this.answer = { [id]: "success" };
    },
    questionError(id) {
      this.answer = { [id]: "error" };
    },
    repeatQuiz() {
      this.isFinished = false;
      this.currentQuestion = 0;
      this.answer = null;
      this.rightAnswer = 0;
      this.falseAnswer = 0;
    },
  },
  computed: {
    quizFinished() {
      return this.currentQuestion + 1 === this.sortArray.length ? true : false;
    },
    sortArray() {
      if (!this.isFinished) {
        const newArr = [...this.quiz];
        for (let i = newArr.length - 1; i > 0; i--) {
          let tmp = newArr[i];
          let rnd = Math.floor(Math.random() * (i + 1));

          newArr[i] = newArr[rnd];
          newArr[rnd] = tmp;
        }

        return newArr.slice(0, 20);
      } else {
        return null;
      }
    },
    precentAnswerRight() {
      return (this.rightAnswer / 20) * 100;
    },
    classFinished() {
      return {
        success: this.precentAnswerRight > 75,
      };
    },
    textFinished() {
      return this.classFinished.success ? "Тест пройден!" : "Тест не пройден!";
    },
  },
};
</script>

<style lang="scss" scoped>
.finished {
  width: 100%;
  max-width: 400px;
  min-height: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 10px;

  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.24);
  &__img {
    width: 77px;
    height: 65px;
    margin-bottom: 40px;
  }
  &__title {
    margin-bottom: 60px;
    font-size: 20px;
  }
  &__button {
    padding: 10px 30px;
    border-radius: 10px;

    font-family: "Segoe UI";
    font-size: 18px;

    background-color: rgb(196, 190, 190);
    box-shadow: 6px 4px 8px 0px rgba(0, 0, 0, 0.12);
    transition: all 0.2s linear;

    &:hover {
      background-color: rgb(170, 248, 97);
    }
  }
  &__false-answer {
    color: red;
    margin-bottom: 10px;
  }
  &__right-answer {
    color: green;
    margin-bottom: 10px;
  }
  &__percent {
    margin-bottom: 20px;
  }
}

.quiz {
  font-family: "Segoe UI";
  width: 100%;
  max-width: 580px;
  min-height: 850px;
  display: flex;

  margin: 50px auto 0;
  padding: 10px 0px 0px 0px;
  border-radius: 10px;
  background: #fff;

  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.164);
  &__inner {
    width: 100%;
    max-width: 505px;

    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  &__button {
    font-family: "Segoe UI";
    font-size: 20px;
    align-self: flex-start;
    background: transparent;
    color: #333131;
    border-bottom: 0.8px solid rgba(0, 0, 0, 0.24);

    padding: 10px;
    margin-bottom: 10px;
    &:hover {
      color: #000000;
    }
  }
  &__title {
    font-size: 32px;
    font-weight: 700;
    color: #333333;
  }
}

.arrow-icon {
  fill: #959292;
  &:hover {
    fill: #333333;
  }
}

.img-box {
  margin-bottom: 30px;
  min-height: 256px;
  display: flex;

  align-items: center;
  &__placeholder {
    margin: 0 auto;
  }
}

.number-question {
  margin-bottom: 30px;
  text-align: center;
  font-size: 20px;
  color: #333333;
  font-weight: 700;
}

.question {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;

  margin-bottom: 30px;
  text-align: center;
  color: #333333;
}

.next-question {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.question-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  &__item {
    padding: 20px 40px;

    border-radius: 5px;
    background: transparent;
    font-family: "Ubuntu";
    color: #333333;

    font-size: 18px;
    border-bottom: 0.8px solid #e8edee;
    transition: all 0.2s linear;

    cursor: pointer;
    &:first-child {
      border-top: 0.8px solid #e8edee;
    }
    &:hover {
      background-color: #e5e5e5d2;
    }
  }
}

.help {
  padding: 20px 0px;
  text-align: right;
  &__link {
    font-size: 12px;
    color: #33333371;
    cursor: pointer;
    &:hover {
      color: #333333;
    }
  }
}

.question-list__item.success {
  background: rgb(173, 233, 113);
  &:hover {
    background: rgb(173, 233, 113);
  }
}

.question-list__item.error {
  background: rgb(233, 113, 113);
  &:hover {
    background: rgb(233, 113, 113);
  }
}

.false-finished {
  border: 2px solid red;
}

.success-finished {
  border: 2px solid green;
}

@media (max-width: 568px) {
  img {
    max-width: none;
  }
  .img-box {
    max-height: 202px;
    margin-bottom: 10px;
    overflow: auto;
  }

  .quiz {
    min-height: 750px;
    margin: 0 auto 0;
    &__inner {
      padding: 0px 10px;
      max-width: auto;
    }
    &__wrapper {
      padding: 20px 10px 40px 10px;
      height: auto;
    }
  }

  .heading {
    margin-bottom: 15px;
  }

  .number-question {
    margin-bottom: 10px;
  }
  .question {
    font-size: 16px;
    line-height: 1.3;
    margin-bottom: 10px;
  }
  .question-list {
    &__item {
      font-size: 16px;
      &:hover {
        background: none;
      }
    }
  }
  .btn-arrow {
    width: 25px;
    height: 25px;
  }
}

@media (max-width: 320px) {
  .question {
    font-size: 14px;
  }
}
</style>
