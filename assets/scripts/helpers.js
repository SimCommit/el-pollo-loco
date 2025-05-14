// helpers.js

/**
 * Stores all interval IDs created via setStoppableInterval.
 * Used by stopAllIntervals() to clear all game-related intervals at once.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Creates a setInterval and registers its ID for global tracking.
 * This allows all such intervals to be stopped later via stopAllIntervals().
 *
 * @param {Function} fn - The function to execute repeatedly.
 * @param {number} time - The interval delay in milliseconds.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Removes an object from an array, optionally after a delay.
 * If a delay is specified, removal is deferred using setTimeout.
 *
 * @param {Object} object - The object to remove.
 * @param {Array} array - The array from which to remove the object.
 * @param {number} [delay=0] - Optional delay in milliseconds before removal.
 */
function despawnObject(object, array, delay = 0) {
  if (delay > 0) {
    setTimeout(() => {
      removeFromArray(object, array);
    }, delay);
  } else {
    removeFromArray(object, array);
  }
}

/**
 * Removes the specified object from the given array.
 * If the object is not found, nothing happens.
 *
 * @param {Object} object - The object to remove.
 * @param {Array} array - The array to modify.
 */
function removeFromArray(object, array) {
  let index = array.indexOf(object);
  array.splice(index, 1);
}

/**
 * Shorthand for document.getElementById.
 *
 * @param {string} id - The ID of the HTML element to retrieve.
 * @returns {HTMLElement} The matching element.
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
  document.querySelectorAll(selector).forEach((el) => el.blur());
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
 * Saves the current sound settings to local storage.
 * Stores the mute state and individual sound volumes as serialized JSON.
 */
function saveToLocalStorage() {
  localStorage.setItem("muteState", JSON.stringify(SoundManager.isMuted));
  localStorage.setItem("volumeState", JSON.stringify(Array.from(SoundManager.volumes.entries())));
}

/**
 * Loads sound settings from local storage and restores them.
 * Applies the mute state and reconstructs the volume map for all sounds.
 */
function loadFromLocalStorage() {
  SoundManager.isMuted = JSON.parse(localStorage.getItem("muteState"));
  const rawVolumes = JSON.parse(localStorage.getItem("volumeState"));
  SoundManager.volumes = new Map(rawVolumes);
}
