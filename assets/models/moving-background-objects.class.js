// moving-background-objects.class.js

class MovingBackgroundObject extends BackgroundObject {
  /**
   * Reference to the game world the moving background object is part of.
   * Set when the moving background object is added to a World instance.
   *
   * @type {World}
   */
  world;

  speed = 4;

  /**
   * Creates a new moving background object with an image and horizontal position.
   *
   * @param {string} imagePath - Path to the background image.
   * @param {number} x - X position of the object in the game world.
   */
  constructor(imagePath, x) {
    super(imagePath, x).loadImage(imagePath);

    /**
     * The horizontal position of the background object in the game world.
     *
     * @type {number}
     */
    this.x = x;

    /**
     * The vertical position of the background object.
     * Calculated based on the object's height to anchor it at the bottom of the screen.
     *
     * @type {number}
     */
    this.y = 480 - this.height;

    this.animate();
  }

  /**
   * Assigns the world instance to the character.
   * Required for interactions with the game environment (e.g. camera, state logic).
   *
   * @param {World} world - The world object the character belongs to.
   */
  setWorld(world) {
    this.world = world;
    // this.x = this.x + this.world.character.x * 2;
    // console.log(this.x);
  }

  animate() {
    setStoppableInterval(() => {
      //   this.x = this.x + this.world.character.x / 2;
      //   console.log(this.x);

      this.handleHorizontalMovement();
      // this.world.cameraX = -this.x + 100;
    }, 1000 / 30);
  }

  handleHorizontalMovement() {
    if (this.world.keyboard.RIGHT) {
      //   this.moveRight();
      this.x = this.x + this.world.character.x / 30;
    }

    if (this.world.keyboard.LEFT) {
      //   this.moveLeft();
      this.x = this.x - this.world.character.x / 30;
    }
  }
}
