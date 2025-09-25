// object-shadow.class.js

/**
 * Represents a shadow object that follows a character or object in the game.
 * @extends MovableObject
 */
class ObjectShadow extends MovableObject {
  /**
   * Image sequence for shadow animation.
   *
   * @type {string[]}
   */
  IMAGES_SHADOW = ["assets/img/2_character_pepe/pepes-shadow-5.png"];

  /**
   * The width of the shadow in pixels.
   *
   * @type {number}
   */
  width = 100;

  /**
   * The height of the shadow in pixels.
   *
   * @type {number}
   */
  height = 38;

  /**
   * Creates a new shadow object.
   * @param {number} objectX - The initial X coordinate of the shadow
   * @param {number} [y=395] - The Y coordinate of the shadow, defaults to 395
   */
  constructor(objectX, y = 395) {
    super().loadImage("assets/img/2_character_pepe/pepes-shadow-5.png");
    this.loadImages(this.IMAGES_SHADOW);
    this.x = objectX;
    this.y = y;
  }

  initShadowLoops() {
    this.animate();
  }

  /**
   * Sets the world reference for the shadow object.
   * @param {World} world - The game world instance
   */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Starts the animation loop for the shadow.
   */
  animate() {
    this.handleShadow();

    setStoppableRAF(() => this.animate());
  }

  /**
   * Updates the shadow position to match the character's position and plays the shadow animation.
   */
  handleShadow() {
    this.x = this.world.character.x;
    this.playAnimation(this.IMAGES_SHADOW);
  }
}
