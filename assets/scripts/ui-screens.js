// ui-screens.js

function hideStartScreen() {
    hideElementById()
}

function muteGame() {
    toggleMute();
    let button = getElementByIdHelper("mute-btn");
    button.classList.toggle("btn-muted");
}

function toggleMute() {
    if (muted) {
        muted = false;
    } else {
        muted = true;
    }
}