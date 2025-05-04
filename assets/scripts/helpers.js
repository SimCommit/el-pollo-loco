// helpers.js

let soundCooldowns = new Map();
let intervalIds = [];

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

// helper for playing sounds
 function playSound(path, rate, volume, cooldown) {
  if(soundCooldowns.get(path)) return;

  const sound = new Audio(path);
  sound.playbackRate = rate;
  sound.volume = volume;
  sound.play();

  soundCooldowns.set(path, true);
  setTimeout(() => {
    soundCooldowns.set(path, false);
  }, cooldown);
}

// decides if delay is set or not
function despawnObject(object, array, delay = 0) {
  if (delay > 0) {
    setTimeout(() => {
      removeFromArray(object, array);
    }, delay);
  } else {
    removeFromArray(object, array);
  }
}

// removes an object form an array
function removeFromArray(object, array) {
  let index = array.indexOf(object);
  array.splice(index, 1);  
}

/**
 * Returns an HTML element by its ID.
 *
 * Simplifies `document.getElementById` calls throughout the code.
 *
 * @param {string} id - The ID of the HTML element to retrieve.
 * @returns {HTMLElement} The matching HTML element.
 */
function getElementHelper(id) {
  let element = document.getElementById(id);
  return element;
}

/**
 * Prevents the event from bubbling up to parent elements.
 *
 * Can be used in inline event handlers like `onclick` to stop parent elements from reacting to the same event.
 *
 * @param {Event} event - The event object to stop from propagating.
 */
function prevent(event) {
  event.stopPropagation();
}
