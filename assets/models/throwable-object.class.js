// throwable-object.class.js

/**
 * @class ThrowableObject
 * @extends MovableObject
 *
 * Represents a throwable item such as a salsa bottle.
 * Handles its rotation animation during flight and splash animation on impact.
 */
class ThrowableObject extends MovableObject {
  /**
   * Animation frames for the bottle rotating while in the air.
   * @type {string[]}
   */
  IMAGES_ROTATION = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Animation frames for the splash effect when the bottle hits something.
   * @type {string[]}
   */
  IMAGES_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Defines the hitbox offset for collision detection.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 6,
    bottom: 6,
    left: 6,
    right: 6,
  };

  /**
   * Vertical acceleration applied to the object (gravity effect).
   * @type {number}
   */
  acceleration = 1;

  /**
   * Vertical acceleration applied to the object (gravity effect).
   * @type {number}
   */
  isBroken = false;

  /**
   * Frame delay between splash animation frames when broken.
   * Controls animation speed.
   * @type {number}
   */
  frameDelayIsBroken = 2;

  /**
   * Damage dealt by the thrown bottle upon impact.
   * @type {number}
   */
  damage = 50;

  /**
   * Creates a new throwable bottle at the specified position.
   * Loads all necessary images, sets position, and initiates throw and animation.
   *
   * @param {number} x - Horizontal starting position.
   * @param {number} y - Vertical starting position.
   */
  constructor(x, y) {
    super();
    this.loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);

    /**
     * Horizontal position of the bottle.
     * @type {number}
     */
    this.x = x;

    /**
     * Vertical position of the bottle.
     * @type {number}
     */
    this.y = y;
    this.throw();
    this.animate();
  }

  /**
   * Starts the animation loop for the throwable object.
   * Updates the current state and triggers corresponding animation logic.
   * Runs at 12 frames per second.
   */
  animate() {
    setStoppableInterval(() => {
      this.updateState();

      switch (this.currentState) {
        case "broken":
          this.handleBroken();
          break;
        case "thrown":
          this.handleThrown();
          break;
      }
    }, 1000 / 12);
  }

  /**
   * Handles the splash animation when the bottle is broken.
   * Plays the splash animation frames with a controlled frame delay.
   */
  handleBroken() {
    if (this.skipFrame % this.frameDelayIsBroken === 0) {
      this.playAnimation(this.IMAGES_SPLASH);
    }
    this.skipFrame += 1;
  }

  /**
   * Handles the rotation animation while the bottle is flying through the air.
   */
  handleThrown() {
    this.playAnimation(this.IMAGES_ROTATION);
  }

  /**
   * Updates the current animation state based on whether the bottle is broken.
   * Resets animation counters if the state has changed.
   */
  updateState() {
    let newState;
    if (this.isBroken) {
      newState = "broken";
    } else {
      newState = "thrown";
    }
    if (newState !== this.currentState) {
      this.resetCurrentImage();
      this.resetSkipFrame();
    }
    this.currentState = newState;
  }
}
