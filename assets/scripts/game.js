// game.js

let canvas;
let world;
let keyboard = new Keyboard();
let lastInput = new Date().getTime() + 15000;

function init() {
  canvas = getElementByIdHelper("canvas");
}

function startGame() {
  SoundManager.stopAll();
  lastInput = new Date().getTime() + 15000;
  stopAllIntervals();
  paused = false;
  intiLevel();
  world = new World(canvas, keyboard);
  SoundManager.playOne(SoundManager.MUSIC_BACKGROUND, 1, 0.02, 0)
  resetUi();
  blurButton(".btn");
}

function quitGame() {
  SoundManager.stopAll();
  stopAllIntervals();
  showElementById("start-screen");
  blurButton(".btn");
}

function stopAllIntervals() {
  intervalIds.forEach(clearInterval);
}

window.addEventListener("load", () => {
  getElementByIdHelper("btn-move-left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  getElementByIdHelper("btn-move-left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  getElementByIdHelper("btn-move-right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  getElementByIdHelper("btn-move-right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  getElementByIdHelper("btn-jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  getElementByIdHelper("btn-jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  getElementByIdHelper("btn-throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });
  getElementByIdHelper("btn-throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
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
    // case "ArrowUp":
    //   keyboard.UP = true;
    //   break;
    // case "ArrowDown":
    //   keyboard.DOWN = true;
    //   break;
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
    // case "ArrowUp":
    //   keyboard.UP = false;
    //   break;
    // case "ArrowDown":
    //   keyboard.DOWN = false;
    //   break;
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
