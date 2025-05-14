// ui-screens.js

/**
 * Resets the user interface to the default gameplay view.
 * - Shows game menu buttons
 * - Hides endscreen buttons
 * - Updates the mute button visual state
 * - If touch controls are appropriate, displays control buttons and toggles instructions
 */
function resetUi() {
  showGameMenuButtons();
  hideEndscreenButtons();
  updateMuteButtonState();

  if (shouldShowTouchControls()) {
    showControlButtons();
    toggleInstructions();
  }
}

/**
 * Hides the start screen UI element.
 * Typically used at the beginning of the game to transition into gameplay.
 */
function hideStartScreen() {
  hideElementById();
}

/**
 * Updates the visual state of the mute button based on the current mute status.
 * Adds or removes the 'btn-muted' CSS class on the mute button element
 * to reflect whether sound is currently muted.
 */
function updateMuteButtonState() {
  let button = getElementByIdHelper("mute-btn");
  if (SoundManager.isMuted) {
    button.classList.add("btn-muted");
  } else {
    button.classList.remove("btn-muted");
  }
}

/**
 * Hides the loading screen by adding the 'd-none' CSS class
 * to the element with the 'loading-screen' class.
 */
function hideLoadingScreen() {
  document.querySelector(".loading-screen").classList.add("d-none");
}

/**
 * Shows the loading screen by removing the 'd-none' CSS class
 * from the element with the 'loading-screen' class.
 */
function showLoadingScreen() {
  document.querySelector(".loading-screen").classList.remove("d-none");
}

/**
 * Hides the game menu buttons by adding the 'd-none' CSS class
 * to the element with the 'game-menu' class.
 */
function hideGameMenuButtons() {
  document.querySelector(".game-menu").classList.add("d-none");
}

/**
 * Shows the game menu buttons by removing the 'd-none' CSS class
 * from the element with the 'game-menu' class.
 */
function showGameMenuButtons() {
  document.querySelector(".game-menu").classList.remove("d-none");
}

/**
 * Hides the on-screen control buttons by adding the 'd-none' CSS class
 * to the element with the 'controls' class.
 */
function hideControlButtons() {
  document.querySelector(".controls").classList.add("d-none");
}

/**
 * Shows the on-screen control buttons by removing the 'd-none' CSS class
 * from the element with the 'controls' class.
 */
function showControlButtons() {
  document.querySelector(".controls").classList.remove("d-none");
}

/**
 * Hides the endscreen buttons by adding the 'd-none' CSS class
 * to the element with the 'endscreen-menu' class.
 */
function hideEndscreenButtons() {
  document.querySelector(".endscreen-menu").classList.add("d-none");
}

/**
 * Shows the endscreen buttons by removing the 'd-none' CSS class
 * from the element with the 'endscreen-menu' class.
 */
function showEndscreenButtons() {
  document.querySelector(".endscreen-menu").classList.remove("d-none");
}

/**
 * Determines whether the device supports touch input.
 *
 * @returns {boolean} True if the device is touch-capable, false otherwise.
 */
function shouldShowTouchControls() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
 * Displays the appropriate control instructions based on input type.
 * - If the device supports touch, shows touch instructions.
 * - Otherwise, shows keyboard instructions.
 */
function toggleInstructions() {
  if (shouldShowTouchControls()) {
    showTouchInstructions();
  } else {
    showKeyboardInstructions();
  }
}

/**
 * Sets the instruction image to show touch control instructions.
 * Updates the `src` attribute of the element with ID 'input-instructions'
 * to display the image for touch-based input.
 */
function showTouchInstructions() {
  getElementByIdHelper("input-instructions").src = "assets/img/ui/touch-controls-stardos-stencil.png";
}

/**
 * Sets the instruction image to show keyboard control instructions.
 * Updates the `src` attribute of the element with ID 'input-instructions'
 * to display the image for keyboard-based input.
 */
function showKeyboardInstructions() {
  getElementByIdHelper("input-instructions").src = "assets/img/ui/keyboard-controls-stardos-stencil.png";
}

/**
 * Toggles fullscreen mode on or off for the element with ID 'fullscreen'.
 * Enters fullscreen if not already in it, otherwise exits fullscreen.
 * Also removes focus from any button with class 'btn'.
 */
function toggleFullscreen() {
  let fullscreen = getElementByIdHelper("fullscreen");
  if (!document.fullscreenElement) {
    enterFullscreen(fullscreen);
  } else {
    exitFullscreen(fullscreen);
  }
  blurButton(".btn");
}

/**
 * Requests fullscreen mode for the given element.
 * Uses vendor-prefixed methods where necessary for legacy support.
 *
 * @param {HTMLElement} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode using the appropriate method for the browser.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
