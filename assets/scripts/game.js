// game.js

let canvas;
let world;
let keyboard = new Keyboard();
let lastInput = new Date().getTime() + 15000;
let loadedImageCount = 0;
let REQUIRED_IMAGE_COUNT = 225;

function init() {
  canvas = getElementByIdHelper("canvas");
  toggleInstructions();
  toggleInstructions();
}

function countLoadedImages() {
  loadedImageCount++;
  console.log(loadedImageCount);
}

function startGame() {
  loadFromLocalStorage();
  SoundManager.stopAll();
  lastInput = new Date().getTime() + 15000;
  stopAllIntervals();
  paused = false;
  intiLevel();
  world = new World(canvas, keyboard);
  SoundManager.playOne(SoundManager.MUSIC_BACKGROUND, 1, 0.04, 0, true);
  resetUi();
  blurButton(".btn");
}

function restartDuringPlay() {
  if (world.endscreenTriggered) return;
  startGame();
}

function quitDuringPlay() {
  if (world.endscreenTriggered) return;
  quitGame();
}

function quitGame() {
  SoundManager.stopAll();
  stopAllIntervals();
  showElementById("start-screen");
  resetUi();
  blurButton(".btn");
}

function stopAllIntervals() {
  intervalIds.forEach(clearInterval);
}

window.addEventListener("load", () => {
  getElementByIdHelper("btn-move-left").addEventListener("touchstart", (e) => {
    if (e.cancelable) e.preventDefault();

    keyboard.LEFT = true;
  });

  getElementByIdHelper("btn-move-left").addEventListener("touchend", (e) => {
    if (e.cancelable) e.preventDefault();

    keyboard.LEFT = false;
    lastInput = new Date().getTime();
  });

  getElementByIdHelper("btn-move-right").addEventListener("touchstart", (e) => {
    if (e.cancelable) e.preventDefault();

    keyboard.RIGHT = true;
  });

  getElementByIdHelper("btn-move-right").addEventListener("touchend", (e) => {
    if (e.cancelable) e.preventDefault();

    keyboard.RIGHT = false;
    lastInput = new Date().getTime();
  });

  getElementByIdHelper("btn-jump").addEventListener("touchstart", (e) => {
    if (e.cancelable) e.preventDefault();

    keyboard.SPACE = true;
  });
  getElementByIdHelper("btn-jump").addEventListener("touchend", (e) => {
    if (e.cancelable) e.preventDefault();

    keyboard.SPACE = false;
    lastInput = new Date().getTime();
  });

  getElementByIdHelper("btn-throw").addEventListener("touchstart", (e) => {
    if (e.cancelable) e.preventDefault();

    keyboard.D = true;
  });
  getElementByIdHelper("btn-throw").addEventListener("touchend", (e) => {
    if (e.cancelable) e.preventDefault();

    keyboard.D = false;
    lastInput = new Date().getTime();
  });
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case " ":
      keyboard.SPACE = true;
      break;
    case "d":
    case "D":
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
    case " ":
      keyboard.SPACE = false;
      break;
    case "d":
    case "D":
      keyboard.D = false;
      break;
  }
});
