// background-object.class.js

/**
 * @class BackgroundObject
 * Represents a background object in the game, such as mountains or sky.
 * Extends the MovableObject class and is rendered at a fixed vertical position.
 */
class BackgroundObject extends MovableObject {
  /**
   * The width of the background object in pixels.
   *
   * @type {number}
   */
  width = 720;

  /**
   * The height of the background object in pixels.
   *
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new background object with an image and horizontal position.
   *
   * @param {string} imagePath - Path to the background image.
   * @param {number} x - X position of the object in the game world.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);

    /**
     * The horizontal position of the background object in the game world.
     *
     * @type {number}
     */
    this.x = x;

    /**
     * The vertical position of the background object.
     * Calculated based on the object's height to anchor it at the bottom of the screen.
     *
     * @type {number}
     */
    this.y = 480 - this.height;
  }
}
