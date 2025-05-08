// ui-screens.js

function hideStartScreen() {
  hideElementById();
}

function resetUi() {
  document.querySelector(".game-menu").classList.remove("d-none");
  document.querySelector(".endscreen-menu").classList.add("d-none");
}

function hideGameButtons() {
  document.querySelector(".game-menu").classList.add("d-none");
  document.querySelector(".controls").classList.add("d-none");

}

function showEndscreenButtons() {
  document.querySelector(".endscreen-menu").classList.remove("d-none");
}

function muteGame() {
  toggleMute();
  let button = getElementByIdHelper("mute-btn");
  button.classList.toggle("btn-muted");
  blurButton("mute-btn");
}

function toggleMute() {
  if (muted) {
    muted = false;
  } else {
    muted = true;
  }
}

function toggleFullscreen() {
  let fullscreen = getElementByIdHelper("fullscreen");
  if (!document.fullscreenElement) {
    enterFullscreen(fullscreen);
  } else {
    exitFullscreen(fullscreen);
  }
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
