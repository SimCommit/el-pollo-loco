// obstacle.class.js

/**
 * @class Obstacle
 * @extends DrawableObject
 * 
 * Represents a static obstacle in the game world that blocks or interacts with other objects.
 * Currently used for cacti, but can represent other hazards like fences or rocks.

 */
class Obstacle extends DrawableObject {
  /**
   * Defines the hitbox offset for the obstacle.
   * Used to fine-tune collision detection.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 20,
    bottom: 0,
    left: 20,
    right: 20,
  };

  /**
   * Creates a new Obstacle instance with specified position, size, and collision offsets.
   *
   * @param {string} path - The path to the obstacle image.
   * @param {number} x - Horizontal position of the obstacle.
   * @param {number} y - Vertical position of the obstacle.
   * @param {number} width - Width of the obstacle in pixels.
   * @param {number} height - Height of the obstacle in pixels.
   * @param {number} [top=0] - Optional top offset for hitbox adjustment.
   * @param {number} [right=0] - Optional right offset for hitbox adjustment.
   * @param {number} [bottom=0] - Optional bottom offset for hitbox adjustment.
   * @param {number} [left=0] - Optional left offset for hitbox adjustment.
   */
  constructor(path, x, y, width, height, top = 0, right = 0, bottom = 0, left = 0) {
    super();
    this.loadImage(path);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offset.top = top;
    this.offset.right = right;
    this.offset.bottom = bottom;
    this.offset.left = left;
  }
}
