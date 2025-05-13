// bottle-bar.class.js

/**
 * @class BottleBar
 * A status bar that displays the current amount of bottles (ammo).
 * Extends the StatusBar class and uses orange bottle images.
 */
class BottleBar extends StatusBar {
  
  /**
   * Paths to the images representing different bottle levels.
   *
   * @type {string[]}
   */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * The vertical position of the bottle bar on the screen.
   *
   * @type {number}
   */
  y = 90;

  /**
   * Creates a new BottleBar instance and sets the initial percentage.
   *
   * @param {number} percentage - The initial percentage to be displayed (0–100).
   */
  constructor(percentage) {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(percentage);
  }
}
