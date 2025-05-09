// helpers.js

let soundCooldowns = new Map();
let muted = true;
let intervalIds = [];

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

// helper for playing sounds
function playSound(path, rate, volume, cooldown, loop = false) {
  if (muted) return;
  if (soundCooldowns.get(path)) return;

  const sound = new Audio(path);
  sound.playbackRate = rate;
  sound.volume = volume;
  sound.loop = loop;
  sound.play();

  if (!loop) {
    soundCooldowns.set(path, true);
    setTimeout(() => {
      soundCooldowns.set(path, false);
    }, cooldown);
  }
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
function getElementByIdHelper(id) {
  let element = document.getElementById(id);
  return element;
}

/**
 * Removes focus from all elements matching the given selector.
 * 
 * @param {string} selector - A CSS selector (e.g. '.btn')
 */
function blurButton(selector) {
  document.querySelectorAll(selector).forEach(el => el.blur());
}

/**
 * Adds the 'd-none' class to the element with the given ID using getElementByIdHelper.
 *
 * @param {string} id - The ID of the HTML element to hide.
 */
function hideElementById(id) {
  let element = getElementByIdHelper(id);
  if (element) {
    element.classList.add("d-none");
  }
}

/**
 * Removes the 'd-none' class from the element with the given ID using getElementByIdHelper.
 *
 * @param {string} id - The ID of the HTML element to show.
 */
function showElementById(id) {
  let element = getElementByIdHelper(id);
  if (element) {
    element.classList.remove("d-none");
  }
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
