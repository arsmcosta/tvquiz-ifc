const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'No filme Matrix, NEO escolher tomar qual cor de pílula?',
        choice1: 'Azul',
        choice2: 'Verde',
        choice3: 'Vermelho',
        choice4: 'Amarelo',
        answer: 3,
    },
    {
        question: 'Na série Vikings, em qual temporada Ragnar se tornou rei?',
        choice1: 'Primeira',
        choice2: 'Segunda',
        choice3: 'Terceira',
        choice4: 'Quarta',
        answer: 2,
    },
    {
        question: 'Qual filme foi anunciado de maneira equivocada como o vencedor do Melhor Filme do Ano no Oscar de 2017?',
        choice1: 'Vida',
        choice2: 'A Chegada',
        choice3: 'La La Land',
        choice4: 'Moonlight: Sobre a Luz do Luar',
        answer: 3,
    },
]

const SCORE_POINTS = 0;
const MAX_QUESTIONS = 3;
startQuiz = () => {
    questionCount = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCount > MAX_QUESTIONS){
        localStorage.setItem('newestScore', score);

        return window.location.assign('/end.html');
    }

    questionCount++;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

startQuiz();
