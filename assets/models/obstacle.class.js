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
   * Hitbox offset object initialized as empty, populated in constructor.
   * @type {{ top?: number, right?: number, bottom?: number, left?: number }}
   */
  offset = {};

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

    /**
     * Horizontal position of the obstacle in the game world.
     * @type {number}
     */
    this.x = x;

    /**
     * Vertical position of the obstacle in the game world.
     * @type {number}
     */
    this.y = y;

    /**
     * Width of the obstacle in pixels.
     * @type {number}
     */
    this.width = width;

    /**
     * Height of the obstacle in pixels.
     * @type {number}
     */
    this.height = height;

    /**
     * Defines the hitbox offset for collision detection.
     * Each side (top, right, bottom, left) can be adjusted independently.
     * @type {{ top: number, right: number, bottom: number, left: number }}
     */
    this.offset.top = top;
    this.offset.right = right;
    this.offset.bottom = bottom;
    this.offset.left = left;
  }
}
