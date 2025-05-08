// game.js

let canvas;
let world;
let keyboard = new Keyboard();
let lastInput = new Date().getTime() + 15000;
// let paused = true;

function init() {
  canvas = getElementByIdHelper("canvas");
}

function startGame() {
  lastInput = new Date().getTime() + 15000;
  stopAllIntervals();
  paused = false;
  intiLevel();
  world = new World(canvas, keyboard);
  resetUi();
}

function togglePause() {
  if (!paused) {
    paused = true;
  } else if (paused) {
    paused = false;
    // world.draw();
    // world.run();
  }
}

function quitGame() {
  stopAllIntervals();
  showElementById("start-screen");
}

function stopAllIntervals() {
  intervalIds.forEach(clearInterval);
}
  
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "ArrowUp":
      keyboard.UP = true;
      break;
    case "ArrowDown":
      keyboard.DOWN = true;
      break;
    case " ":
      keyboard.SPACE = true;
      break;
    case "d":
      keyboard.D = true;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  lastInput = new Date().getTime();
  switch (event.key) {
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowUp":
      keyboard.UP = false;
      break;
    case "ArrowDown":
      keyboard.DOWN = false;
      break;
    case " ":
      keyboard.SPACE = false;
      break;
    case "d":
      keyboard.D = false;
      break;
    case "o":
      startGame();
    break;
  }
});
