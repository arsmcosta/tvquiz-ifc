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
    question: 
      "No filme Matrix, NEO escolher tomar qual cor de pílula?",
    choice1: "Azul",
    choice2: "Verde",
    choice3: "Vermelho",
    choice4: "Amarelo",
    answer: 3,
  },
  {
    question: 
      "Na série Vikings, em qual temporada Ragnar se tornou rei?",
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
  {
    question:
      "Qual clássico animado foi o primeiro filme do 'Renascimento da Disney' no final do século XX?",
    choice1: "A Pequena Sereia",
    choice2: "Pinóquio",
    choice3: "A Bela e a Fera",
    choice4: "Aladdin",
    answer: 1,
  },
  {
    question:
      "Qual foi o personagem mais famoso interpretado pelo icônico Charles Chaplin?",
    choice1: "Carlitos",
    choice2: "O Mágico",
    choice3: "Operário",
    choice4: "O Garoto",
    answer: 1, 
  },
  {
    question:
      "Qual é o principal medo de Sheldon Cooper, em The Big Bang Theory?",
    choice1: "Aranhas",
    choice2: "Germes e sujeira",
    choice3: "Alienígenas",
    choice4: "Água",
    answer: 2, 
  },
  {
    question:
      "Em Lúcifer, qual o nome verdadeiro de Lúcifer Morningstar?",
    choice1: "Samuel",
    choice2: "Miguel",
    choice3: "Samael",
    choice4: "Rafael",
    answer: 2, 
  },
  {
    question:
      "Em La Casa De Papel, quem executou a Nairobi?",
    choice1: "Gandia",
    choice2: "Alicia Sierra",
    choice3: "Arturo",
    choice4: "Estocolmo",
    answer: 1, 
  },
  {
    question:
      "Em Game of Thrones, qual foi o primeiro lobo gigante, pertencente aos Stark, a morrer?",
    choice1: "Grey Wind (Robb)",
    choice2: "Lady (Sansa)",
    choice3: "Fantasma/Ghost (Jon)",
    choice4: "Nymeria (Arya)",
    answer: 2, 
  },
  {
    question:
      "Na saga Harry Potter, qual o nome verdadeiro de Voldemort?",
    choice1: "Voldemort",
    choice2: "Tom Riddle",
    choice3: "Lord Voldemort",
    choice4: "Tom Granger",
    answer: 2, 
  },
  {
    question:
      "Para onde a família de Kevin viajou em Esqueceram de Mim?",
    choice1: "Paris",
    choice2: "Nova Iorque",
    choice3: "Londres",
    choice4: "Inglaterra",
    answer: 1, 
  },
  {
    question:
      "Três filmes dividem o posto de filme mais premiado no Oscar, com 11 premiações cada. Quais são eles?",
    choice1: "Titanic - O Senhor dos Anéis: A sociedade do Anel - Vingadores: Ultimato",
    choice2: "O poderoso chefão - Titanic - O Senhor dos Anéis: As Duas Torres",
    choice3: "O senhor dos Anéis: O Retorno do Rei - Ben-Hur - Titanic",
    choice4: "Vingadores: Ultimato - Titanic - Ben-Hur",
    answer: 3, 
  },
  {
    question:
      "No seriado 'How I Met Your Mother', Ted Most narra a história de como conheceu a mãe de seus filhos, qual o nome dela?",
    choice1: "Diana Wilson",
    choice2: "Tracy McConnell",
    choice3: "Victoria Spencer",
    choice4: "Jennifer Fields",
    answer: 2, 
  },
  {
    question:
      "Na trilogia Vingadores, apenas dois outros personagens conseguiram levantar o martelo Mjölnir, de Thor. Quem são eles?",
    choice1: "Capitão América e Hulk",
    choice2: "Homem de Ferro e Visão",
    choice3: "Viúva Negra e Feiticeira Escarlate",
    choice4: "Capitão América e Visão",
    answer: 4, 
  },
  {
    question:
      "Na série Breaking Bad, Walter White produzia uma metanfetamina que se destacava por sua pureza e pela cor característica. Que cor era essa?",
    choice1: "Vermelho",
    choice2: "Amarelo",
    choice3: "Azul",
    choice4: "Transparente",
    answer: 3, 
  },
  {
    question:
      "Qual o nome da cidade onde se passa a série Stranger Things?",
    choice1: "Hawkins",
    choice2: "Stranger Ville",
    choice3: "West View",
    choice4: "Nashwille",
    answer: 1, 
  },
  {
    question:
      "No filme O Poderoso Chefão, quem é o filho mais velho de Don Corleone?",
    choice1: "Michael",
    choice2: "Tom",
    choice3: "Fredo",
    choice4: "Sonny",
    answer: 4, 
  },
  {
    question:
      "Pela atuação em qual desses filmes Leonardo DiCaprio venceu o Oscar de melhor ator?",
    choice1: "Titanic",
    choice2: "A Origem",
    choice3: "O Regresso",
    choice4: "O Lobo de Wall Street",
    answer: 3, 
  },
  {
    question:
      "Em Star Wars, qual a relação entre Darth Vader e Anakin Skywalker?",
    choice1: "Irmãos",
    choice2: "Pai e filho",
    choice3: "Tio e sobrinho",
    choice4: "Nenhuma das alternativas",
    answer: 3, 
  },
  {
    question:
      "No filme O Diário da Princesa, onde a avó (rainha) da princesa vive?",
    choice1: "Inglaterra",
    choice2: "Genóvia",
    choice3: "Rússia",
    choice4: "Eslováquia",
    answer: 2, 
  },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 15;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

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
