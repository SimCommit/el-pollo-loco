// game.js

let canvas;
let world;
let keyboard = new Keyboard();
let lastInput = new Date().getTime() + 15000;

function init() {
  canvas = getElementByIdHelper("canvas");
  toggleInstructions();
  toggleInstructions();
}

function startGame() {
  loadFromLocalStorage();
  SoundManager.stopAll();
  lastInput = new Date().getTime() + 15000;
  stopAllIntervals();
  paused = false;
  intiLevel();
  world = new World(canvas, keyboard);
  SoundManager.playOne(SoundManager.MUSIC_BACKGROUND, 1, 0.02, 0, true);
  resetUi();
  blurButton(".btn");
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
  getElementByIdHelper("btn-move-left").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      keyboard.LEFT = true;
    },
    { passive: false }
  );
  getElementByIdHelper("btn-move-left").addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      keyboard.LEFT = false;
    },
    { passive: false }
  );

  getElementByIdHelper("btn-move-right").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
    },
    { passive: false }
  );
  getElementByIdHelper("btn-move-right").addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      keyboard.RIGHT = false;
    },
    { passive: false }
  );

  getElementByIdHelper("btn-jump").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      keyboard.SPACE = true;
    },
    { passive: false }
  );
  getElementByIdHelper("btn-jump").addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      keyboard.SPACE = false;
    },
    { passive: false }
  );

  getElementByIdHelper("btn-throw").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      keyboard.D = true;
    },
    { passive: false }
  );
  getElementByIdHelper("btn-throw").addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      keyboard.D = false;
      lastInput = new Date().getTime();
    },
    { passive: false }
  );
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
