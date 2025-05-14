// game.js

/** @type {HTMLCanvasElement} The game's rendering surface */
let canvas;

/** @type {World} The main game world instance */
let world;

/** @type {Keyboard} Stores the current input state of all relevant keys */
let keyboard = new Keyboard();

/**
 * Timestamp of the most recent user interaction.
 * Used for detecting idle time (e.g. long idle animation).
 * Starts with a 15s offset to delay initial idle checks.
 * @type {number}
 */
let lastInput = new Date().getTime() + 15000;

/**
 * Counter for tracking how many images have finished loading.
 * Used to control loading screens or game start conditions.
 * @type {number}
 */
let loadedImageCount = 0;

/**
 * The total number of images required before the game can start.
 * @type {number}
 */
let REQUIRED_IMAGE_COUNT = 265;

/**
 * Initializes the game by assigning the canvas element
 * and triggering the initial UI instruction toggle sequence.
 * Called once on page load.
 */
function init() {
  canvas = getElementByIdHelper("canvas");
  toggleInstructions();
  toggleInstructions();
}

/**
 * Increments the loaded image counter and checks if all required images are loaded.
 * Once loading is complete, hides the loading screen, starts background music,
 * and resets the counter for future loading sequences.
 */
function handleImageLoad() {
  loadedImageCount++;
  console.log(loadedImageCount);
  if (loadedImageCount === REQUIRED_IMAGE_COUNT) {
    hideLoadingScreen();
    SoundManager.playOne(SoundManager.MUSIC_BACKGROUND, 1, 0.04, 0, true);
    loadedImageCount = 0;
  }
}

/**
 * Starts the game by preparing the state, initializing the world,
 * and setting up all presentation-related elements such as sound, UI, and idle timing.
 */
function startGame() {
  prepareGameState();
  initializeWorld();
  initializePresentation();
}

/**
 * Resets essential game state components before a new round starts.
 * Clears previous intervals, restores local storage data, and stops all sounds.
 */
function prepareGameState() {
  showLoadingScreen();
  loadFromLocalStorage();
  SoundManager.stopAll();
  stopAllIntervals();
}

/**
 * Initializes the game world and its level data,
 * then creates a new World instance using the canvas and keyboard input.
 */
function initializeWorld() {
  intiLevel();
  world = new World(canvas, keyboard);
}

/**
 * Initializes the visual game state including UI reset and input timing.
 * Prevents premature long idle detection by delaying the idle timer.
 */
function initializePresentation() {
  resetUi();
  blurButton(".btn");
  lastInput = new Date().getTime() + 15000;
}

/**
 * Restarts the game during active play unless the endscreen has already been triggered.
 */
function restartDuringPlay() {
  if (world.endscreenTriggered) return;
  startGame();
}

/**
 * Quits the game during active play unless the endscreen has already been triggered.
 */
function quitDuringPlay() {
  if (world.endscreenTriggered) return;
  quitGame();
}

/**
 * Quits the game and returns to the start screen.
 * Stops all sounds and intervals, resets the UI, and re-enables start interaction.
 */
function quitGame() {
  SoundManager.stopAll();
  stopAllIntervals();
  showElementById("start-screen");
  resetUi();
  blurButton(".btn");
}

/**
 * Clears all active intervals that were stored in the global interval list.
 * Used to fully stop game-related update loops (e.g. animation, movement).
 */
function stopAllIntervals() {
  intervalIds.forEach(clearInterval);
}

/**
 * Sets up touch event listeners for mobile controls after the page has fully loaded.
 * Maps touch interactions to virtual keyboard input (LEFT, RIGHT, SPACE, D),
 * and updates the idle timer to avoid triggering long idle animations.
 */
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

/**
 * Listens for keyboard keydown events and maps them to the game's virtual keyboard state.
 * Enables movement, jumping, and throwing via arrow keys, spacebar, and D key.
 */
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

/**
 * Listens for keyboard keyup events and resets the corresponding input state.
 * Also updates the lastInput timestamp to prevent long idle animations.
 */
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
