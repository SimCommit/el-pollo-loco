// endboss-health-bar.class.js

/**
 * @class EndbossHealthBar
 * @extends StatusBar
 *
 * Displays the current health of the Endboss as a horizontal bar.
 * The bar changes visually based on the percentage value.
 */
class EndbossHealthBar extends StatusBar {
  IMAGES = [
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * Width of the health bar in pixels.
   * Affects its size on the screen.
   * @type {number}
   */
  width = 270;

  /**
   * Height of the health bar in pixels.
   * @type {number}
   */
  height = 60;

  /**
   * Current fill level of the health bar (0–100).
   * Represents the Endboss's remaining health.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates a new health bar for the Endboss.
   * Loads the images, sets initial health to 100%, and positions the bar above the boss.
   *
   * @param {MovableObject} boss - The Endboss object this health bar is attached to.
   */
  constructor(boss) {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);

    /**
     * Horizontal position of the health bar, aligned with the Endboss.
     * @type {number}
     */
    this.x = boss.x;

    /**
     * Vertical position of the health bar, placed above the Endboss.
     * @type {number}
     */
    this.y = boss.y - 20;

    /**
     * Reference to the Endboss object for dynamic position or health syncing.
     * @type {MovableObject}
     */
    this.boss = boss;
    this.animate();
  }

  /**
   * Starts the animation loop for the health bar.
   * Continuously updates the position to stay attached to the Endboss.
   */
  animate() {
    setStoppableInterval(() => {
      this.stickToBoss();
    }, 1000 / 30);
  }

  /**
   * Updates the position of the health bar relative to the Endboss.
   * Positions the bar centered horizontally and slightly above the boss.
   */
  stickToBoss() {
    this.x = this.boss.x + 10;
    this.y = this.boss.y - 40;
  }
}
