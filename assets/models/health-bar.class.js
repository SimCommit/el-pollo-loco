// health-bar.class.js

/**
 * @class HealthBar
 * @extends StatusBar
 *
 * Displays the player's health as a horizontal bar in the UI.
 * The bar updates visually based on the current percentage value.
 */
class HealthBar extends StatusBar {
  /**
   * Array of image paths for different health levels (0–100%).
   * Used to reflect the player's current health visually.
   * @type {string[]}
   */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * Vertical position of the health bar on the canvas.
   * Usually fixed to the top edge of the screen.
   * @type {number}
   */
  y = 0;

  /**
   * Creates a new HealthBar instance and sets the initial health percentage.
   *
   * @param {number} percentage - Initial health value (0–100).
   */
  constructor(percentage) {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(percentage);
  }
}
