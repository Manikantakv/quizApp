const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCountText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const progressbarfull = document.getElementById('progressbarfull');
let currentQuestion = {};

let acceptingAnswers = false;
let score = 0;
let questionCounter =0;

let availableQuestions = [];

let questions = [
    {
        Question: "Who was first indian all rounder to score a century at lord's?",
        choice1: 'Irfan Pathan',
        choice2: 'Sachin Tendulkar',
        choice3: 'Ajit agarkar',
        choice4: 'Virender Sehwag',
        answer: 3
    },
    {
        Question: "Who was first Cricketer to score 200 runs in an ODI Match?",
        choice1: 'Irfan Pathan',
        choice2: 'Sachin Tendulkar',
        choice3: 'Ajit agarkar',
        choice4: 'Virender Sehwag',
        answer: 2
    }, {
        Question: "Who was first indian to score 300 in a Test Match?",
        choice1: 'Irfan Pathan',
        choice2: 'Sachin Tendulkar',
        choice3: 'Ajit agarkar',
        choice4: 'Virender Sehwag',
        answer: 4
    }, {
        Question: "Who was first indian all rounder to have hat-trick in a Test Match?",
        choice1: 'Irfan Pathan',
        choice2: 'Sachin Tendulkar',
        choice3: 'Ajit agarkar',
        choice4: 'Virender Sehwag',
        answer: 1
    }
]

//constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(!availableQuestions.length || questionCounter >= MAX_QUESTIONS){
        return window.location.assign("./end.html");
    }
    questionCounter++;
    progressbarfull.style.width = `${((questionCounter - 1)/MAX_QUESTIONS) * 100}%`;
    questionCountText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.Question;
    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    console.log(choices);
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach((choice) => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply = (selectedAnswer == currentQuestion.answer) ? 'correct' : 'incorrect';
        if(classToApply == 'correct'){
            score = score + CORRECT_BONUS;
            scoreText.innerText = score; 
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },500);
        console.log('target', selectedAnswer);
       
    })
})
getScore() {

}
startGame();