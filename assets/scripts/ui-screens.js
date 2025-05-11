// ui-screens.js

function hideStartScreen() {
  hideElementById();
}

function resetUi() {
  showGameMenuButtons();
  hideEndscreenButtons();
  updateMuteButtonState();

  if (shouldShowTouchControls()) {
    showControlButtons();
    toggleInstructions();
  }
}

function updateMuteButtonState() {
  let button = getElementByIdHelper("mute-btn");
  if (SoundManager.isMuted) {
    button.classList.add("btn-muted");
  } else {
    button.classList.remove("btn-muted");
  }
}

function hideGameMenuButtons() {
  document.querySelector(".game-menu").classList.add("d-none");
}

function showGameMenuButtons() {
  document.querySelector(".game-menu").classList.remove("d-none");
}

function hideControlButtons() {
  document.querySelector(".controls").classList.add("d-none");
}

function showControlButtons() {
  document.querySelector(".controls").classList.remove("d-none");
}

function showEndscreenButtons() {
  document.querySelector(".endscreen-menu").classList.remove("d-none");
}

function hideEndscreenButtons() {
  document.querySelector(".endscreen-menu").classList.add("d-none");
}

function shouldShowTouchControls() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function toggleInstructions() {
  if (shouldShowTouchControls()) {
    showTouchInstructions();
  } else {
    showKeyboardInstructions();
  }
}

function showTouchInstructions() {
  getElementByIdHelper("input-instructions").src = "assets/img/ui/touch-controls-stardos-stencil.png";
}

function showKeyboardInstructions() {
  getElementByIdHelper("input-instructions").src = "assets/img/ui/keyboard-controls-stardos-stencil.png";
}

function toggleFullscreen() {
  let fullscreen = getElementByIdHelper("fullscreen");
  if (!document.fullscreenElement) {
    enterFullscreen(fullscreen);
  } else {
    exitFullscreen(fullscreen);
  }
  blurButton(".btn");
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
