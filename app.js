let gameSeq = [];
let userSeq = [];
let colors = ["red", "blue", "green", "yellow"];

let level = 0;
let started = false;
let highScore = 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("highScore");

// Start game on keypress or tap
function startGame() {
  if (!started) {
    started = true;
    levelup();
  }
}
document.addEventListener("keypress", startGame);
document.addEventListener("click", startGame);

// Flash effect for game
function btnFlash(btn) {
  if (!btn) return;
  btn.classList.add("btnflash");
  setTimeout(() => btn.classList.remove("btnflash"), 500);
}

// Flash effect for user
function userFlash(btn) {
  btn.classList.add("btnflash");
  setTimeout(() => btn.classList.remove("btnflash"), 250);
}

// Go to next level
function levelup() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * colors.length);
  let randomcolor = colors[randIdx];
  let randbtn = document.querySelector(".btn." + randomcolor);

  gameSeq.push(randomcolor);
  btnFlash(randbtn);
}

// Check answer
function checkAnswer(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    // Play error sound
    document.getElementById("wrongSound").play();

    // Flash red background
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "#222";
    }, 200);

    // Update high score
    let score = level - 1;
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }

    h2.innerHTML = `Game Over! Your Score: <b>${score}</b>. Tap or press any key to restart`;
    reset();
  }
}

// Handle user button press
function btnpress(e) {
  e.preventDefault(); // prevent double triggers on touch
  let btn = this;
  userFlash(btn);

  let usercolor = btn.classList[1];
  userSeq.push(usercolor);

  checkAnswer(userSeq.length - 1);
}

// Attach click & touch events to buttons
let allbtns = document.querySelectorAll(".btn");
allbtns.forEach(btn => {
  btn.addEventListener("click", btnpress);
  btn.addEventListener("touchstart", btnpress);
});

// Reset game
function reset() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = false;
}
