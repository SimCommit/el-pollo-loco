// helpers.js

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