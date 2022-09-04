export default [
  {
    question:
      "Как создать новый экземпляр Array из массивоподобного или итерируемого объекта? ",
    rightAnswerID: 4,
    answers: [
      { text: "Array.prototype.ArrayFrom( )", id: 1 },
      { text: "Array.convertFrom( )", id: 2 },
      { text: "Array.fromObject( )", id: 3 },
      { text: "Array.from", id: 4 },
    ],
    alternate: "/static/img/quiz/example.png",
  },
  {
    question:
      "Как получить количество параметров функции, заданных при её объявлении?",
    rightAnswerID: 1,
    answers: [
      { text: "func.length", id: 1 },
      { text: "func.count", id: 2 },
      { text: "func.arguments", id: 3 },
      { text: "func.parametrs", id: 4 },
    ],
    alternate: "/static/img/quiz/example.png",
  },
  {
    question: "Какой результат покажет консоль?",
    rightAnswerID: 4,
    answers: [
      { text: "false", id: 1 },
      { text: "NaN", id: 2 },
      { text: "Такого типа сравнения делать нельзя", id: 3 },
      { text: "true", id: 4 },
    ],
    img: "/static/img/quiz/3.PNG",
  },
  {
    question: "Какой результат покажет консоль?",
    rightAnswerID: 1,
    answers: [
      { text: "[1, 2, 3]", id: 1 },
      { text: "['a : 1', 'b : 1', c : 1]", id: 2 },
      { text: "[пустой массив]", id: 3 },
      { text: "['a', 'b', 'c']", id: 4 },
    ],
    img: "/static/img/quiz/4.PNG",
  },
  {
    question: "Чему будет равно данное выражение? ",
    rightAnswerID: 4,
    answers: [
      { text: "true", id: 1 },
      { text: "3", id: 2 },
      { text: "false", id: 3 },
      { text: "2", id: 4 },
    ],
    img: "/static/img/quiz/5.PNG",
  },
  {
    question: "Какой результат покажет консоль?",
    rightAnswerID: 2,
    answers: [
      { text: "true", id: 1 },
      { text: "false", id: 2 },
      { text: "null", id: 3 },
      { text: "undefined", id: 4 },
    ],
    img: "/static/img/quiz/6.PNG",
  },
];
