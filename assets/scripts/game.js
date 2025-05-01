// game.js

let canvas;
let world;
let keyboard = new Keyboard();
let lastInput = new Date().getTime() + 15000;

function init() {
  canvas = getElementHelper("canvas");
  world = new World(canvas, keyboard);
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
  }
});
