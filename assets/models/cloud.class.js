// cloud.class.js

/**
 * @class Cloud
 * @extends MovableObject
 *
 * Represents a background cloud object that moves slowly to the left
 * and loops back to the right edge once off-screen.
 */
class Cloud extends MovableObject {
  /**
   * Vertical position of the cloud on the canvas.
   * Fixed to create a parallax effect.
   * @type {number}
   */
  y = 0;

  /**
   * Width of the cloud image in pixels.
   * @type {number}
   */
  width = 600;

  /**
   * Height of the cloud image in pixels.
   * Affects rendering only, not collision (clouds are background elements).
   * @type {number}
   */
  height = 338;

  /**
   * Movement speed of the cloud in pixels per frame.
   * Creates a slow scrolling background.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Creates a new cloud object with the specified horizontal position and image variant.
   *
   * @param {number} x - Initial horizontal position of the cloud.
   * @param {number} num - Number of the cloud image variant (e.g. 1, 2, 3...).
   */
  constructor(x, num) {
    super();
    this.loadImage(`assets/img/5_background/layers/4_clouds/${num}.png`);

    /**
     * Horizontal position of the cloud on the canvas.
     * @type {number}
     */
    this.x = x;
    this.animate();
  }

  /**
   * Starts the cloud's movement loop.
   * Continuously moves the cloud to the left.
   * Once it moves off-screen, it wraps around to the right side.
   */
  animate() {
    setStoppableInterval(() => {
      if (this.x < -750) {
        this.x = 4950;
      }
      this.moveLeft();
    }, 1000 / 60);
  }
}
