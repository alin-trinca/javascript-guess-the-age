"use strict";

let secretNumber = Math.trunc(Math.random() * 99) + 1;
let score = 20;
let highscore = 0;

const numberField = document.querySelector(".number");
const messageField = document.querySelector(".message");
const scoreField = document.querySelector(".score");
const guessField = document.querySelector(".guess");
const title = document.querySelector("h1");
const body = document.querySelector("body");

const displayMessage = function (message) {
  messageField.innerHTML = message;
};

const guessFunc = function () {
  const guess = Number(guessField.value);

  if (!guess) {
    displayMessage(
      '<i class="fa-solid fa-triangle-exclamation"></i> No number!'
    );

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('<i class="fa-solid fa-trophy"></i> Correct Age!');
    numberField.textContent = secretNumber;
    numberField.classList.add("shake");

    title.textContent = "You Guessed It!";
    body.style.background = "#3d7e52";
    messageField.classList.add("win");

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    // When player is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber
          ? '<i class="fa-solid fa-person-cane"></i> Too old!'
          : '<i class="fa-solid fa-child"></i> Too young!'
      );
      score--;
      scoreField.textContent = score;
    } else {
      displayMessage('<i class="fa-solid fa-thumbs-down"></i> You lost!');
      messageField.classList.add("lost");
      scoreField.textContent = 0;
    }
  }
};

document.querySelector(".check").addEventListener("click", guessFunc);
guessField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    guessFunc();
  }
});

// Try again
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 99) + 1;

  displayMessage("Start guessing...");
  scoreField.textContent = score;
  numberField.textContent = "?";
  numberField.classList.remove("shake");
  title.textContent = "Guess The Age!";
  guessField.value = "";

  body.removeAttribute("style");
  messageField.classList.remove("win", "lost");
});
