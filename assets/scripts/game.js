let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = getElementHelper("canvas");
  world = new World(canvas, keyboard);
//   console.log("My Character is", world.character);
}

document.addEventListener("keydown", (event) => {
  console.log(event.keyCode);

  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = true;
    console.log(keyboard.LEFT);
  }

  if (event.keyCode == 38) {
    keyboard.UP = true;
  }

  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (event.keyCode == 32) {
    keyboard.SPACE = true;
    console.log(keyboard);
  }
});

document.addEventListener("keyup", (event) => {
  console.log(event.keyCode);

  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = false;
    console.log(keyboard.LEFT);
  }

  if (event.keyCode == 38) {
    keyboard.UP = false;
  }

  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (event.keyCode == 32) {
    keyboard.SPACE = false;
    console.log(keyboard);
  }
});
