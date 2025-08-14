// status-bar.class.js

/**
 * @class StatusBar
 * @extends DrawableObject
 *
 * Base class for visual status indicators such as health, coins, or boss health.
 * Handles positioning and percentage-based display logic.
 */
class StatusBar extends DrawableObject {
  /**
   * Horizontal position of the status bar on the screen.
   * @type {number}
   */
  x = 15;

  /**
   * Width of the status bar in pixels.
   * @type {number}
   */
  width = 188;

  /**
   * Height of the status bar in pixels.
   * @type {number}
   */
  height = 50;

  /**
   * Current percentage value represented by the bar (0–100).
   * Determines which image is displayed.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates a new StatusBar instance.
   * Should be extended by more specific bar types.
   */
  constructor() {
    super();
  }

  /**
   * Updates the current percentage and sets the corresponding image.
   * The image is chosen based on the percentage value using resolveImageIndex().
   *
   * @param {number} percentage - The new percentage value (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current percentage value.
   * Used to determine which visual state of the bar to display.
   *
   * @returns {number} Index of the image corresponding to the percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80 && this.percentage < 100) {
      return 4;
    } else if (this.percentage >= 60 && this.percentage < 80) {
      return 3;
    } else if (this.percentage >= 40 && this.percentage < 60) {
      return 2;
    } else if (this.percentage > 0 && this.percentage < 40) {
      return 1;
    } else {
      return 0;
    }
  }
}
