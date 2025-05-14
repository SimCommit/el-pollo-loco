// coin-bar.class.js

/**
 * @class CoinBar
 * @extends StatusBar
 *
 * Represents the coin collection progress bar in the UI.
 * Displays different images based on the current coin collection percentage.
 */
class CoinBar extends StatusBar {
  /**
   * Array of image paths representing different fill levels of the coin bar.
   * Used to visually indicate how many coins the player has collected.
   * @type {string[]}
   */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * Vertical position of the coin bar on the canvas.
   * Affects where the bar appears in the UI.
   * @type {number}
   */
  y = 45;

  /**
   * Creates a new CoinBar instance and sets the initial fill percentage.
   *
   * @param {number} percentage - Initial coin collection percentage (0–100).
   */
  constructor(percentage) {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(percentage);
  }
}
