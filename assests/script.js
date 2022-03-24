var timer = document.getElementById("time-left")

var gameIntro = document.getElementById("game-intro")
var startButton = document.getElementById("intro-start-btn")

var strtGame = document.getElementById("start-game")
var questionEl = document.getElementById("questions")
var answerButton = document.getElementById("answer-button")
var nextButton = document.getElementById("next-btn")

var resultsEl = document.getElementById("results")
var restartButton = document.getElementById("restart-btn")


var questionIndex, shuffledQuestion;

var timeRemaining = 40;
var timerId;
var gameOver;
var score;
var questions = [
    {
        question: "what is my name",
        choices: ["jasper", "barcial", "jhon", "all of the above"],
        correctAns: "all of the above",

    },
    {
        question: "1+1",
        choices: ["1", "2", "3", "4"],
        correctAns: "2",
    },
    {
        question: "2+2",
        choices: ["2", "4", "3", "6"],
        correctAns: "4",
    },
    {
        question: "1-1",
        choices: ["0", "1", "2", "3"],
        correctAns: "0",
    },
    {
        question: "question",
        choices: ["a", "b", "c", "d"],
        correctAns: "a",
    }
];


startButton.addEventListener("click", startGame)

nextButton.addEventListener("click", () => {
    questionIndex++
    setQuestions()
})

function startGame() {
    //hides intro screen
    gameIntro.classList.add("hide")
    //remove the "hide" class, and pops up the game-container
    strtGame.classList.remove("hide")
    //starts the timer:
    timerId = setInterval(timeClock, 1000)
    //ramdomize the questions
    questionIndex = 0;
    shuffledQuestion = questions.sort(() => Math.random() - .5)
    setQuestions();
    console.log(answerButton.children)

}

function setQuestions() {
    answerReset()
    //shuffles the question
    if (questionIndex < shuffledQuestion.length) {
        showQuestions(shuffledQuestion[questionIndex])
    } else {
        restartGame()
    }
}

function showQuestions(question) {
    questionEl.innerText = question.question

    question.choices.forEach(choice => {
        var button = document.createElement("button")
        button.innerText = choice
        button.classList.add("answer-btn")

        //this if-else state will set true or flase data set on all the answer buttons
        if (choice == question.correctAns) {
            button.dataset.correct = true
        } else {
            button.dataset.correct = false;
        }

        button.addEventListener('click', selectAnswer)
        answerButton.appendChild(button)
    })
}

function answerReset() {
    // clearStatusClass(document.body)
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    var selecButton = e.target
    var correctAnswer = selecButton.dataset.correct
    console.log(correctAnswer)
    Array.from(answerButton.children).filter(button => {
        let buttons = button.dataset.correct
        setStatus(button, buttons)
    });
    // this adds or reduce timer
    if (correctAnswer === 'true') {
        timeRemaining += 5;
    } else {
        timeRemaining -= 10;
    }
}

function setStatus(element, selectedAnswer) {
    clearStatusClass(element)
    if (selectedAnswer === 'true') {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


function timeClock() {
    if (timeRemaining >= 0) {
        timeRemaining--;
        timer.textContent = timeRemaining;
    } else {
        clearInterval(timerId, 0)
        restartGame();
    }
}


function restartGame() {
    strtGame.classList.add('hide')
    resultsEl.classList.remove('hide')

    restartButton.addEventListener('click', () => {
        resultsEl.classList.add('hide')
        startGame()
    })
}
