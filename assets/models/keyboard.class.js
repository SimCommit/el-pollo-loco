// keyboard.class.js

/**
 * @class Keyboard
 *
 * Tracks the current state of user input via specific keyboard keys.
 * Each property represents whether the corresponding key is currently pressed.
 */
class Keyboard {
  /**
   * Whether the spacebar is pressed (e.g. for jumping).
   * @type {boolean}
   */
  SPACE = false;

  /**
   * Whether the up arrow key is pressed.
   * @type {boolean}
   */
  UP = false;

  /**
   * Whether the right arrow key is pressed.
   * @type {boolean}
   */
  RIGHT = false;

  /**
   * Whether the down arrow key is pressed.
   * @type {boolean}
   */
  DOWN = false;

  /**
   * Whether the left arrow key is pressed.
   * @type {boolean}
   */
  LEFT = false;

  /**
   * Whether the 'D' key is pressed (e.g. for throwing).
   * @type {boolean}
   */
  D = false;
}
