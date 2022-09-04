<template>
  <div id="app">
    <div class="container">
      <section class="section-tasks" v-if="blockTasks">
        <Header
          @click-link="changeLevel"
          :linkName="linkName"
          :isActiveLink="isActiveLink"
          @click-quiz="clickQuiz"
        />
        <!--Окно поиска задачи-->
        <div class="search-tasks" v-if="isActiveSearch">
          <div class="search-tasks__window">
            <button class="search-tasks__btn-closed" @click="activeSearchTasks">
              <img src="static/close.svg" alt="" />
            </button>
            <div class="search-tasks__title">Поиск по задачам</div>
            <input
              type="text"
              class="search-tasks__input"
              placeholder="Начните вводить имя задачи"
              v-model.trim="searchTaskText"
            />
            <div
              class="search-animation"
              v-if="searchTaskText.length <= 5"
            ></div>
            <Card
              :tasks="searchTask"
              @click-button="clickButtonInCardinSearch"
            />
          </div>
        </div>
        <!--Окно поиска задачи-->
        <Main
          :tasks="collection"
          @click-button="clickButtonInCard"
          @filter-checked="filterCheked"
          @filter-unchecked="filterUncheked"
          @search-tasks="activeSearchTasks"
        />
        <Pagination
          :quantityPages="quantityPages"
          @page-num="pageNum"
          :isActivePagination="isActivePagination"
        />

        <div class="share" v-if="filterTasks.length === 0">
          Доделать: роутер, дб.
        </div>
      </section>
      <section class="section-quiz" v-if="blockQuiz">
        <Quiz @click-tasks="clickTasks" :activeQuiz="blockQuiz" />
      </section>
    </div>
  </div>
</template>

<script>
import tasks from "@/arrTasks";
import Quiz from "@/components/quiz/Quiz";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import Pagination from "@/components/pagination/Pagination";
import Card from "@/components/Main/card/card";

export default {
  name: "App",
  components: {
    Header,
    Main,
    Quiz,
    Pagination,
    Card,
  },
  data() {
    return {
      tasks,
      filterTasks: [], //Массив, в который фильтруется текущий уровень сложности
      level: "", //Переменная, которая отвечает за выбор уровня сложности задач
      isActiveLink: "", //Переменная, которая отвечает за отображение активного класса в уровнях сложности задач
      linkName: ["Основы", "Начинающий", "Средний"],
      blockQuiz: false, //Переменная, которая отвечает за показ блока с вопросами
      blockTasks: true, //Переменная, которая отвечает за показ блока с задачами
      itemOnPages: 5, //Переменная, которая отвечает за то, сколько будет itemoв на странице.
      start: 0, // Переменная, которая отвечает за первый индекс участка копирования из исходного массива
      end: 10, //Переменная, которая отвечает за последний индекс участка копирования из исходного массива
      isActivePagination: 1, //Переменная для отображения активного класса кнопке пагинации

      isActiveSearch: false, //Включает поиск таски
      searchTaskText: "", // ввод текста таски
    };
  },

  created() {
    const data = localStorage.getItem("tasks");

    if (data) {
      const checkedData = JSON.parse(data);
      for (let key in checkedData) {
        const currentArray = checkedData[key];
        const newArr = this.tasks[key];

        if (currentArray.length < newArr.length) {
          let numberNewValues = newArr.length - currentArray.length;
          let newTasks = newArr.slice(newArr.length - numberNewValues);

          currentArray.unshift(...newTasks);
        }
      }
      this.tasks = checkedData;
    }
  },
  methods: {
    // Меняет флаг поиска таски
    activeSearchTasks() {
      this.isActiveSearch = !this.isActiveSearch;
      this.searchTaskText = "";
    },
    // При клике на кнопке пагинации, получает номер страницы и номера, по которым копируется участок массива.
    pageNum(page) {
      this.start = (page - 1) * this.itemOnPages;

      this.end = this.start + this.itemOnPages;
      this.isActivePagination = page;
    },
    // Копирует участок массива.
    paginate(arr) {
      return arr.slice(this.start, this.end);
    },

    // Меняет статус карточки активная/неактивная
    clickButtonInCard(idx) {
      let index = idx[0];

      this.tasks[this.level + 1][index + this.start].checked = !this.tasks[
        this.level + 1
      ][index + this.start].checked;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    clickButtonInCardinSearch(idx) {
      let title = idx[1];
      this.filterTasks.forEach((item) => {
        if (item.title === title) {
          item.checked = !item.checked;
        }
      });
    },

    // Выбирает уровень сложности
    changeLevel(level) {
      this.filterTasks = this.tasks[level + 1];
      this.level = level;
      this.isActiveLink = level;
    },
    // Показывает только решенные задачи
    filterCheked() {
      this.filterTasks.sort((x, y) =>
        x.checked === y.checked ? 0 : x.checked ? -1 : 1
      );
      this.start = 0;
      this.end = 10;
      this.isActivePagination = 1;
    },
    // Показывает только нерешенные задачи
    filterUncheked() {
      this.filterTasks.sort((x, y) =>
        x.checked === y.checked ? 0 : y.checked ? -1 : 1
      );
      this.start = 0;
      this.end = 10;
      this.isActivePagination = 1;
    },
    // Открывает блок с вопросамиitemOnPages
    clickQuiz() {
      this.blockQuiz = true;
      this.blockTasks = false;
    },
    // Открывает блок с задачами
    clickTasks() {
      this.blockQuiz = false;
      this.blockTasks = true;
    },
  },
  computed: {
    // Вовзращает кол-во страниц пагинации
    quantityPages() {
      return Math.ceil(this.filterTasks.length / this.itemOnPages);
    },
    // Отдает только первые 10 страниц вопросов
    collection() {
      return this.paginate(this.filterTasks);
    },
    // Поиск в title задачи
    searchTask() {
      return this.filterTasks.filter((task) => {
        if (this.searchTaskText !== "" && this.searchTaskText.length > 5) {
          return task.title.toLowerCase().includes(this.searchTaskText);
        }
      });
    },
  },
  watch: {
    // Следит за переключением сложности и сбрасывает пагинацию до дефолта.
    level() {
      this.start = 0;
      this.end = 10;
      this.isActivePagination = 1;
    },
    searchTaskText() {
      this.searchTaskText = this.searchTaskText.toLowerCase();
    },
    isActiveSearch(val) {
      val
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1110px;

  margin: 0 auto;
}

.share {
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.4;
}

.search-tasks {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.336);

  z-index: 1000;
  display: flex;
  align-items: flex-start;
  overflow-y: auto;

  &__window {
    position: relative;
    width: 95%;
    max-width: 1150px;
    min-height: 300px;
    padding: 20px;

    background: #ffffff;
    border-radius: 5px;
    display: flex;
    margin: 10px auto 0;
    flex-direction: column;
  }
  &__title {
    margin-bottom: 40px;
    text-align: center;
    font-family: "Ubuntu";
    font-size: 24px;
  }
  &__input {
    padding: 15px 24px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid rgba(0, 0, 0, 0.185);
    border-radius: 3px;

    &::placeholder {
      font-family: "Segoe UI";
    }
    &:focus {
      border: 1px solid #000;
    }
  }
  &__btn-closed {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
  }
}
</style>
