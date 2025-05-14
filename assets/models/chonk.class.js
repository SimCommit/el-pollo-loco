// chonk.class.js

/**
 * @class Chonk
 * @extends Chicken
 *
 * Represents a smaller variant of the chicken enemy.
 * Uses different sprites and a more compact hitbox.
 */
class Chonk extends Chicken {
  /**
   * Array of image paths for Chonk's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Image path for Chonk's dead sprite.
   * @type {string[]}
   */
  IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Offset hitbox values to adjust Chonk's collision boundaries.
   * Smaller hitbox compared to normal chicken.
   * @type {{ top: number, right: number, bottom: number, left: number }}
   */
  offset = {
    top: 16,
    right: 16,
    bottom: 24,
    left: 16,
  };

  /**
   * Width of Chonk in pixels.
   * Defines rendering size and horizontal collision bounds.
   * @type {number}
   */
  width = 100;

  /**
   * Height of Chonk in pixels.
   * Defines rendering size and vertical collision bounds.
   * @type {number}
   */
  height = 100;

  /**
   * Total health points of Chonk.
   * Chonk has more health than regular chickens.
   * @type {number}
   */
  health = 50;

  /**
   * Creates a new Chonk instance at the specified position.
   * Loads all required images and starts animation.
   *
   * @param {number} x - Horizontal start position of Chonk.
   * @param {number} [y=328] - Vertical start position (default ground level for Chonk).
   * @param {boolean} [isHelper=false] - Whether Chonk provides helper functionality (e.g. for high jumps).
   */
  constructor(x, y = 328, isHelper = false) {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    /**
     * Horizontal position of the Chonk on the canvas.
     * @type {number}
     */
    this.x = x;

    /**
     * Vertical position of the Chonk on the canvas.
     * @type {number}
     */
    this.y = y;

    /**
     * Whether this Chonk acts as a helper to reach high obstacles.
     * Still interacts with the player like an enemy.
     * @type {boolean}
     */
    this.isHelper = isHelper;
    this.animate();
  }
}
