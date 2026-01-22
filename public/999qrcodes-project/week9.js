const questions = [
  {
    question: "If the sum of a sequence gets closer to one value, then the series is...",
    answers: [
      { text: "arithmetic.", correct: false},
      { text: "geometric.", correct: false},
      { text: "convergent.", correct: true},
      { text: "divergent.", correct: false},
    ]
  },
  {
    question: "The ___ Test states that if you evaluate the limit of aₙ as n approaches infinity, and it does not equal zero, then the series is ___.",
    answers: [
      { text: "Limit Comparison / convergent", correct: false},
      { text: "Limit Comparison / divergent", correct: false},
      { text: "nth-Term / convergent", correct: false},
      { text: "nth-Term / divergent", correct: true},
    ]
  },
  {
    question: "The Geometric Test states that a series is convergent if ___.",
    answers: [
      { text: "r < 1", correct: false},
      { text: "|r| < 1", correct: true},
      { text: "|r| > 1", correct: false},
      { text: "|r| ≠ 1", correct: false},
    ]
  },
  {
    question: "A series that you can find the sum of will always be...",
    answers: [
      { text: "arithmetic.", correct: false},
      { text: "geometric.", correct: true},
      { text: "convergent.", correct: false},
      { text: "divergent.", correct: false},
    ]
  },
  {
    question: "Which is not a condition for the Integral Test?",
    answers: [
      { text: "continuous", correct: false},
      { text: "positive", correct: false},
      { text: "differentiable", correct: true},
      { text: "decreasing", correct: false},
    ]
  },
  {
    question: "In a p-Series Test, a p-value of 1 means that...",
    answers: [
      { text: "it is inconclusive.", correct: false},
      { text: "the series diverges.", correct: true},
      { text: "the series converges.", correct: false},
      { text: "you should use another test.", correct: false},
    ]
  },
  {
    question: "The Direct Comparison Test states that if the...",
    answers: [
      { text: "'smaller' series 'converges', the 'larger' series must 'diverge'.", correct: false},
      { text: "'larger' series 'converges', the 'larger' series must 'diverge'.", correct: false},
      { text: "'smaller' series 'converges', the 'larger' series must 'converge'.", correct: false},
      { text: "'larger' series 'converges', the 'smaller' series must 'converge'.", correct: true},
    ]
  },
  {
    question: "What is false about the Limit Comparison Test?",
    answers: [
      { text: "It doesn't matter which sequence you use for the numerator/denominator.", correct: false},
      { text: "The limit of aₙ divided by bₙ as n approaches infinity must equal L, which must be greater than 1.", correct: true},
      { text: "Other tests are used within this test.", correct: false},
      { text: "You would use this to compare a complex series to a simpler series that is easier to test.", correct: false},
    ]
  },
  {
    question: "The Ratio Test is useful for series that...",
    answers: [
      { text: "converge rapidly.", correct: true},
      { text: "diverge rapidly.", correct: false},
      { text: "converge slowly.", correct: false},
      { text: "diverge slowly.", correct: false},
    ]
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Retake?"
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if (currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})

startQuiz();