// coin.class.js

/**
 * @class Coin
 * @extends CollectibleObject
 *
 * Represents a collectible coin in the game.
 * Can be picked up by the player to increase the coin bar progress.
 * Reaching 100% restores some of the player's health.
 */
class Coin extends CollectibleObject {
  IMAGES = ["assets/img/8_coin/coin_1.png", "assets/img/8_coin/coin_2.png"];

  /**
   * Array of image paths for the coin's animation frames.
   * Used to alternate between two images for a simple spinning effect.
   * @type {string[]}
   */
  offset = {
    top: 16,
    bottom: 16,
    left: 16,
    right: 16,
  };

  /**
   * Width of the coin in pixels.
   * Affects how large the coin is rendered.
   * @type {number}
   */
  width = 70;

  /**
   * Height of the coin in pixels.
   * Affects how large the coin is rendered.
   * @type {number}
   */
  height = 70;

  /**
   * Creates a new coin instance at the specified position.
   * Loads all required images and starts the animation loop.
   *
   * @param {number} x - Horizontal position of the coin on the canvas.
   * @param {number} y - Vertical position of the coin on the canvas.
   */
  constructor(x, y) {
    super(x, y);
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.animate();
  }

  /**
   * Starts the animation loop for the coin.
   * Plays through all available images in the IMAGES array at 5 FPS.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 1000 / 5);
  }
}
