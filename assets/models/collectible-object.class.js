// collectible-object.class.js

/**
 * @class CollectibleObject
 * @extends DrawableObject
 *
 * Abstract base class for collectibles like coins and bottles.
 * Stores position logic shared by all collectibles.
 */
class CollectibleObject extends DrawableObject {
  /**
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   */
  constructor(x, y) {
    super();

    /** @type {number} Horizontal position of the object */
    this.x = x;

    /** @type {number} Vertical position of the object */
    this.y = y;
  }
}
