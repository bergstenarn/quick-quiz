const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// const choices2 = document.querySelectorAll(".choice-text");
// const questionCounterText = document.getElementById("questionCounter");
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("questions.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length <= 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // Go to the end page
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.textContent = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.textContent = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.textContent = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

// Event listeners
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = true;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.textContent = score;
};
