const NUM_ROWS = 20;
const NUM_COLUMNS = 20;
const COLOR_BOARD = "green";
const COLOR_FOOD = "yellow";
const COLOR_SNAKE = "brown";
const TIMER = 1000 / 10;
let point = 0;
let sideBlock;

const BOARD = document.getElementById("board");
const CONTEXT = BOARD.getContext("2d");
const CURRENT_SCORE = document.getElementById("current-score");
const HIGH_SCORE = document.getElementById("high-score");

let snakeHeadX = 0;
let snakeHeadY = 0;
let snakeBody = [];
let speedX = 0;
let speedY = 0;

let posFoodX = 0;
let posFoodY = 0;

let gameOver = false;

const placeFood = () => {
  do {
    posFoodX = Math.floor(Math.random() * NUM_COLUMNS) * sideBlock;
    posFoodY = Math.floor(Math.random() * NUM_ROWS) * sideBlock;
  } while (
    snakeBody.includes([posFoodX, posFoodY]) ||
    (posFoodX === snakeHeadX && posFoodY === snakeHeadY)
  );
};

const changeDirection = (event) => {
  if (event && event.key) {
    let key = event.key;

    if ((key === "ArrowUp" || key === "w") && speedY !== 1) {
      speedY = -1;
      speedX = 0;
    } else if ((key === "ArrowDown" || key === "s") && speedY !== -1) {
      speedY = 1;
      speedX = 0;
    } else if ((key === "ArrowRight" || key === "d") && speedX !== -1) {
      speedY = 0;
      speedX = 1;
    } else if ((key === "ArrowLeft" || key === "a") && speedX !== 1) {
      speedY = 0;
      speedX = -1;
    }
  }
};

const reset = () => {
  snakeBody.length = 0;
  snakeHeadX = 0;
  snakeHeadY = 0;
  speedX = 0;
  speedY = 0;
  point = 0;
  gameOver = false;
  CURRENT_SCORE.textContent = "Puntos: ";
};

const update = () => {
  if (gameOver) {
    if (point > localStorage.getItem("score")) {
      localStorage.setItem("score", point);
    }

    if (confirm("Quieres jugar de nuevo?")) {
      reset();
    } else {
      if (confirm("Quieres salir del juego?")) {
        window.location.href = "about:blank";
      }
    }

    return;
  }

  CONTEXT.fillStyle = COLOR_BOARD;
  CONTEXT.fillRect(0, 0, BOARD.width, BOARD.height);

  CONTEXT.fillStyle = COLOR_FOOD;
  CONTEXT.fillRect(posFoodX, posFoodY, sideBlock, sideBlock);

  if (snakeHeadX === posFoodX && snakeHeadY === posFoodY) {
    snakeBody.push([posFoodX, posFoodY]);
    placeFood();
    point++;
    CURRENT_SCORE.textContent = `Puntos: ${point}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) snakeBody[0] = [snakeHeadX, snakeHeadY];

  CONTEXT.fillStyle = COLOR_SNAKE;
  snakeHeadX += speedX * sideBlock;
  snakeHeadY += speedY * sideBlock;
  CONTEXT.fillRect(snakeHeadX, snakeHeadX, sideBlock, sideBlock);

  for (let i = 0; i < snakeBody.length; i++) {
    CONTEXT.fillRect(snakeBody[i][0], snakeBody[i][1], sideBlock, sideBlock);
  }

  if (
    snakeHeadX < 0 ||
    snakeHeadX > NUM_COLUMNS * sideBlock - 1 ||
    snakeHeadY < 0 ||
    snakeHeadX > NUM_ROWS * sideBlock - 1
  ) {
    gameOver = true;
    alert("game over");
  }

  snakeBody.forEach((block) => {
    if (block[0] === snakeHeadX && block[1] === snakeHeadY) {
      gameOver = true;
      alert("game over");
    }
  });
};

window.addEventListener("load", () => {
  BOARD.width = 350;
  BOARD.height = 350;
  sideBlock = BOARD.width / NUM_COLUMNS;

  let oldScore = localStorage.getItem("score");
  HIGH_SCORE.textContent = `Máximo puntaje: ${oldScore || "0"}`;

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, TIMER);
});
