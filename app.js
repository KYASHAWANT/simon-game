let gameSeq = [];
let userSeq = [];
let colors = ["red", "blue", "green", "yellow"]; // ✅ match your HTML

let level = 0;
let started = false;
let highScore = 0; // 🏆 track high score

let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("highScore"); // <h3 id="highScore"></h3> in HTML

// Start game on keypress
document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game started");
    started = true;
    levelup();
  }
});

// Flash effect for game
function btnFlash(btn) {
  if (!btn) return;
  btn.classList.add("btnflash");
  setTimeout(function () {
    btn.classList.remove("btnflash");
  }, 500);
}

// Flash effect for user clicks (faster)
function userFlash(btn) {
  btn.classList.add("btnflash");
  setTimeout(function () {
    btn.classList.remove("btnflash");
  }, 250);
}

// Go to next level
function levelup() {
  userSeq = []; // reset user sequence each round
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * colors.length);
  let randomcolor = colors[randIdx];
  let randbtn = document.querySelector(".btn." + randomcolor);

  gameSeq.push(randomcolor);

  // Debugging logs
  console.log("Game sequence:", gameSeq);
  console.log("Random color:", randomcolor);

  btnFlash(randbtn);
}

// Check Answer
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
    setTimeout(function () {
      document.body.style.backgroundColor = "white";
    }, 200);

    // 🏆 Update High Score if needed
    let score = level - 1;
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }

    h2.innerHTML = `Game Over! Your Score was <b>${score}</b>. Press any key to restart`;
    reset();
  }
}

// When user clicks a button
function btnpress() {
  let btn = this;
  userFlash(btn);

  // ✅ Use class, not id
  let usercolor = btn.classList[1]; // "red", "blue", etc.
  userSeq.push(usercolor);

  checkAnswer(userSeq.length - 1);
}

// Attach click events
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnpress);
}

// Reset game
function reset() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = false;
}
