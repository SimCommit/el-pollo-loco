// drawable-object.class.js

/**
 * @class DrawableObject
 *
 * Base class for all objects that can be drawn onto the canvas.
 * Handles image management, orientation and collision offsets.
 */
class DrawableObject {
  /**
   * Defines the hitbox offset for the object.
   * Useful for shrinking or expanding collision boundaries relative to the image.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * The currently displayed image of the object.
   * Set by loadImage or animation logic.
   * @type {HTMLImageElement | undefined}
   */
  img;

  /**
   * A cache of preloaded images for animation or performance.
   * Keys are image paths, values are HTMLImageElement instances.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * Index of the current frame in the animation image sequence.
   * Used by playAnimation.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Whether the object is facing left instead of the default right.
   * Used for mirroring the image in rendering logic.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * Loads a single image and assigns it to the `img` property.
   * Used to display a static image or initialize an animation frame.
   *
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads an array of image paths and stores them in the image cache.
   * Used for animations or quick access to different states.
   * Calls the global `countLoadedImages` function on each load.
   *
   * @param {string[]} arr - Array of image file paths to preload.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
      img.onload = handleImageLoad;
    });
  }

  /**
   * Draws the current image of the object onto the canvas.
   * This is the standard rendering function used by all drawable game objects.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.warn(error);
      debugger;
    }
  }

  /**
   * Draws a red outline representing the object's collision hitbox.
   * Only applies to certain object types (Character, Chicken, etc.).
   * Useful for debugging and visualizing hitboxes.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof CollectibleObject ||
      this instanceof Obstacle
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";

      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );

      ctx.stroke();
    }
  }

  /**
   * Cycles through the given image array to create an animation effect.
   * Updates the `img` property to the next frame in the sequence.
   *
   * @param {string[]} images - An array of image paths used for animation frames.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Checks whether this object is colliding with another object.
   * Uses axis-aligned bounding box (AABB) collision detection with hitbox offsets.
   *
   * @param {DrawableObject} other - The object to check collision against.
   * @returns {boolean} True if this object overlaps with the other object.
   */
  isColliding(other) {
    return (
      this.getHitboxBorderRight() >= other.getHitboxBorderLeft() &&
      this.getHitboxBorderLeft() <= other.getHitboxBorderRight() &&
      this.getHitboxBorderBottom() >= other.getHitboxBorderTop() &&
      this.getHitboxBorderTop() <= other.getHitboxBorderBottom()
    );
  }

  /**
   * Calculates the right boundary of the object's hitbox.
   * @returns {number} Right edge including offset.
   */
  getHitboxBorderRight() {
    return this.x + (this.width - this.offset.right);
  }

  /**
   * Calculates the left boundary of the object's hitbox.
   * @returns {number} Left edge including offset.
   */
  getHitboxBorderLeft() {
    return this.x + this.offset.left;
  }

  /**
   * Calculates the bottom boundary of the object's hitbox.
   * @returns {number} Bottom edge including offset.
   */
  getHitboxBorderBottom() {
    return this.y + (this.height - this.offset.bottom);
  }

  /**
   * Calculates the top boundary of the object's hitbox.
   * @returns {number} Top edge including offset.
   */
  getHitboxBorderTop() {
    return this.y + this.offset.top;
  }
}
