// bottle.class.js

/**
 * @class Bottle
 * A collectible salsa bottle that can be picked up by the player.
 * Extends the CollectibleObject class and uses salsa bottle images.
 */
class Bottle extends CollectibleObject {
  /**
   * Paths to the images used for the salsa bottle.
   *
   * @type {string[]}
   */
  IMAGES_BOTTLE = [
    "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "assets/img/6_salsa_bottle/salsa_bottle.png",
    "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Defines the offset for the bottle's hitbox.
   *
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 8,
    bottom: 8,
    left: 8,
    right: 8,
  };

  /**
   * The width of the bottle in pixels.
   *
   * @type {number}
   */
  width = 50;

  /**
   * The height of the bottle in pixels.
   *
   * @type {number}
   */
  height = 50;

  /**
   * Creates a new Bottle instance at the specified position.
   *
   * @param {number} x - The horizontal position of the bottle.
   * @param {number} y - The vertical position of the bottle.
   */
  constructor(x, y) {
    super();

    /**
     * The horizontal position of the bottle in the game world.
     *
     * @type {number}
     */
    this.x = x;

    /**
     * The vertical position of the bottle in the game world.
     *
     * @type {number}
     */
    this.y = y;
    this.loadImage(this.IMAGES_BOTTLE[0]);
    this.loadImages(this.IMAGES_BOTTLE);
  }
}
