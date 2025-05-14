// endscreen.class.js

/**
 * @class UiObject
 * @extends DrawableObject
 *
 * Represents an end screen UI element such as a win or game over banner.
 * Loads a specific image based on the game outcome.
 */
class UiObject extends DrawableObject {
  /**
   * Image shown when the player has won the game.
   * @type {string}
   */
  IMAGE_WON = "assets/img/You won, you lost/You Won B.png";

  /**
   * Image shown when the game is lost.
   * @type {string}
   */
  IMAGE_GAME_OVER = "assets/img/9_intro_outro_screens/game_over/game over!.png";

  /**
   * Creates a new UI endscreen object at the specified position and size.
   * Loads a win or game-over image depending on the result.
   *
   * @param {number} x - Horizontal position of the UI object.
   * @param {number} y - Vertical position of the UI object.
   * @param {number} width - Width of the UI object.
   * @param {number} height - Height of the UI object.
   * @param {boolean} [won=false] - Whether the player won the game.
   */
  constructor(x, y, width, height, won = false) {
    super();

    /**
     * Width of the UI object.
     * @type {number}
     */
    this.width = width;

    /**
     * Height of the UI object.
     * @type {number}
     */
    this.height = height;

    /**
     * Horizontal position of the UI object.
     * @type {number}
     */
    this.x = x;

    /**
     * Vertical position of the UI object.
     * @type {number}
     */
    this.y = y;

    /**
     * Whether the game ended in a win.
     * Affects which image is displayed.
     * @type {boolean}
     */
    this.won = won;
    
    if (won) {
      this.loadImage(this.IMAGE_WON);
    } else {
      this.loadImage(this.IMAGE_GAME_OVER);
    }
  }
}
