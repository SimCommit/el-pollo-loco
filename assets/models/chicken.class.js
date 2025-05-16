// chicken.class.js

/**
 * @class Chicken
 * @extends MovableObject
 *
 * Represents a walking enemy (chicken) in the game world.
 * Chickens can move and be defeated by the player.
 */
class Chicken extends MovableObject {
  /**
   * Array of image paths for the chicken's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Image path for the dead chicken sprite.
   * @type {string[]}
   */
  IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Defines pixel offsets for more accurate collision detection.
   * These values shrink the hitbox compared to the visual image.
   * @type {{ top: number, right: number, bottom: number, left: number }}
   */
  offset = {
    top: 0,
    right: 2,
    bottom: 12,
    left: 0,
  };

  /**
   * Width of the chicken in pixels.
   * Affects rendering and collision boundaries.
   * @type {number}
   */
  width = 50;

  /**
   * Height of the chicken in pixels.
   * Affects rendering and collision boundaries.
   * @type {number}
   */
  height = 50;

  /**
   * Vertical position of the chicken on the canvas (from top).
   * Typically aligned with the ground level.
   * @type {number}
   */
  y = 375;

  /**
   * Delay in frames between changes in the walking animation.
   * Lower values result in faster animation.
   * @type {number}
   */
  frameDelayWalking = 5;

  /**
   * The amount of health the chicken has.
   * Once it reaches 0, the chicken is considered dead.
   * @type {number}
   */
  health = 25;

  /**
   * Indicates whether the chicken should be removed from the game world.
   * Used for despawn logic after death or leaving the screen.
   * @type {boolean}
   */
  isMarkedForDespawn = false;

  lastContactWith = {};

    /**
   * Creates a new chicken enemy at the specified x-position.
   * Loads all images and starts the animation loop.
   * 
   * @param {number} x - Horizontal starting position of the chicken.
   */
  constructor(x) {
    super().loadImage("assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

        /**
     * Horizontal position of the chicken on the canvas.
     * Can be randomized to space out enemies.
     * @type {number}
     */
    this.x = x;

        /**
     * Movement speed of the chicken.
     * Affects how fast it walks to the left.
     * @type {number}
     */
    this.speed = 0.35;

    this.animate();
  }

    /**
   * Starts the chicken's animation loop.
   * Updates the character state and triggers the corresponding behavior
   * (e.g. walking animation or death handling) 60 times per second.
   */
  animate() {
    setStoppableInterval(() => {
      this.updateState();

      switch (this.currentState) {
        case "dead":
          this.handleDeadChicken();
          break;
        case "walking":
          this.handleWalkingChicken();
          break;
      }
    }, 1000 / 60);
  }

    /**
   * Handles the behavior of the chicken in the "dead" state.
   * Plays the dead animation and disables the hitbox for collision detection.
   */
  handleDeadChicken() {
    this.playAnimation(this.IMAGES_DEAD);
    this.disableHitbox();
  }

    /**
   * Handles the behavior of the chicken in the "walking" state.
   * Moves the chicken to the left and plays walking animation
   * with frame skipping logic for performance-controlled animation speed.
   */
  handleWalkingChicken() {
    this.moveLeft();

    if (this.skipFrame % this.frameDelayWalking === 0) {
      this.playAnimation(this.IMAGES_WALKING);
    }
    this.skipFrame += 1;
  }

    /**
   * Updates the current state of the chicken based on its internal status.
   * Sets the state to "dead" if the chicken is dead, otherwise to "walking".
   */
  updateState() {
    let newState;

    if (this.isDead()) {
      newState = "dead";
    } else {
      newState = "walking";
    }

    this.currentState = newState;
  }
}
