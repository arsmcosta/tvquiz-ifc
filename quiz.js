const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "No filme Matrix, NEO escolher tomar qual cor de pílula?",
    choice1: "Azul",
    choice2: "Verde",
    choice3: "Vermelho",
    choice4: "Amarelo",
    answer: 3,
  },
  {
    question: "Na série Vikings, em qual temporada Ragnar se tornou rei?",
    choice1: "Primeira",
    choice2: "Segunda",
    choice3: "Terceira",
    choice4: "Quarta",
    answer: 2,
  },
  {
    question:
      "Qual filme foi anunciado de maneira equivocada como o vencedor do Melhor Filme do Ano no Oscar de 2017?",
    choice1: "Vida",
    choice2: "A Chegada",
    choice3: "La La Land",
    choice4: "Moonlight: Sobre a Luz do Luar",
    answer: 3,
  },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 3;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("newestScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;

  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startQuiz();
