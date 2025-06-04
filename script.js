const questions = [
  {
    question: "Who won the IPL 2023 season?",
    options: ["Gujarat Titans", "Chennai Super Kings", "Mumbai Indians", "RCB"],
    answer: "Chennai Super Kings"
  },
  {
    question: "Which player has the most IPL centuries?",
    options: ["Virat Kohli", "Chris Gayle", "David Warner", "KL Rahul"],
    answer: "Virat Kohli"
  },
  {
    question: "Which team is called 'Paltan'?",
    options: ["MI", "CSK", "SRH", "RR"],
    answer: "MI"
  }
];

let current = 0;
let score = 0;
let answered = false;
let timerInterval;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  answered = false;
  const q = questions[current];

 
  questionEl.innerText = q.question;
  answersEl.innerHTML = "";
  nextBtn.disabled = true;

 
  document.getElementById("question-container").classList.remove("fade-in");
  void questionEl.offsetWidth; 
  document.getElementById("question-container").classList.add("fade-in");

 
  startTimer(10);

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(btn, opt);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(button, selected) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const correctAnswer = questions[current].answer;

  Array.from(answersEl.children).forEach(btn => {
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn.innerText === selected) {
      btn.classList.add("wrong");
    } else {
      btn.style.opacity = "0.6";
    }
    btn.disabled = true;
  });

  if (selected === correctAnswer) {
    score++;
    scoreEl.innerText = score;
  }

  nextBtn.disabled = false;
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    questionEl.innerText = "🏆 Quiz Completed!";
    answersEl.innerHTML = `<h3>Your Final Score: ${score}/${questions.length}</h3>`;
    nextBtn.style.display = "none";
    document.getElementById("timer").style.display = "none";
  }
}

function startTimer(seconds) {
  const timerEl = document.getElementById("timer");
  let timeLeft = seconds;
  timerEl.innerText = `⏱️ Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `⏱️ Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      lockAnswers();
      nextBtn.disabled = false;
    }
  }, 1000);
}

function lockAnswers() {
  answered = true;
  const correctAnswer = questions[current].answer;
  Array.from(answersEl.children).forEach(btn => {
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });
}

window.onload = loadQuestion;
