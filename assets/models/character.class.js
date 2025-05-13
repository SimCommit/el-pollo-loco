// character.class.js

/**
 * @class Character
 * The main character of the game (Pepe).
 * Contains all image arrays for different animation states.
 * Extends the MovableObject class.
 */
class Character extends MovableObject {
  /**
   * Image sequence for death animation.
   *
   * @type {string[]}
   */
  IMAGES_DYING = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Image sequence for hurt animation.
   *
   * @type {string[]}
   */
  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Image sequence for jumping animation.
   *
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    // "assets/img/2_character_pepe/3_jump/J-31.png",
    // "assets/img/2_character_pepe/3_jump/J-32.png",
    // "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    // "assets/img/2_character_pepe/3_jump/J-38.png",
    // "assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Image sequence for walking animation.
   *
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Image sequence for extended idle (long idle) animation.
   *
   * @type {string[]}
   */
  IMAGES_LONG_IDLE = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Image sequence for normal idle animation.
   *
   * @type {string[]}
   */
  IMAGES_IDLE = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * Defines the collision hitbox offset for the character.
   * Useful for adjusting the bounding box relative to the image size.
   *
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 104,
    bottom: 24,
    left: 28,
    right: 28,
  };

  /**
   * Frame delay settings for various animation states.
   * Higher values result in slower animations for that state.
   *
   * @type {{ dead: number, jumping: number, longIdle: number, idle: number }}
   */
  frameDelay = {
    dead: 5,
    jumping: 6,
    longIdle: 12,
    idle: 10,
  };

  /**
   * The horizontal position of the character.
   *
   * @type {number}
   */
  x = 120;

  /**
   * The current vertical position of the character.
   *
   * @type {number}
   */
  y = 220;

  /**
   * Vertical position from the previous frame.
   * Used for vertical movement smoothing or animation syncing.
   *
   * @type {number}
   */
  lastY = 220;

  /**
   * Vertical position from two frames ago.
   * Supports smoother vertical transitions.
   *
   * @type {number}
   */
  lastY2 = 220;

  /**
   * Vertical position from three frames ago.
   * Used for motion tracking across multiple frames.
   *
   * @type {number}
   */
  lastY3 = 220;

  /**
   * The width of the character in pixels.
   *
   * @type {number}
   */
  width = 100;

  /**
   * The height of the character in pixels.
   *
   * @type {number}
   */
  height = 200;

  /**
   * Horizontal movement speed of the character.
   *
   * @type {number}
   */
  speed = 8;

  /**
   * Vertical movement speed (positive = falling, negative = jumping).
   *
   * @type {number}
   */
  speedY = 0;

  /**
   * Vertical acceleration applied to the character (simulates gravity).
   *
   * @type {number}
   */
  acceleration = 1;

  /**
   * The current health of the character (0–100).
   *
   * @type {number}
   */
  health = 100;

  /**
   * The amount of damage the character can deal to enemies.
   *
   * @type {number}
   */
  damage = 50;

  /**
   * Reference to the game world the character is part of.
   * Set when the character is added to a World instance.
   *
   * @type {World}
   */
  world;

  /**
   * Creates a new Character instance and initializes its animation states.
   * Loads all relevant image sequences, applies gravity and movement,
   * and sets the initial state to "idle".
   */
  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DYING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.applyHorizontalForce();
    this.currentState = "idle";
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
  }

  /**
   * Starts the animation loop for the character.
   * Updates the animation state, handles character behavior based on state,
   * and tracks Y-position history for smooth motion.
   *
   * Runs at a fixed interval of 30 FPS.
   */
  animate() {
    setStoppableInterval(() => {
      this.updateState();
      this.world.camera_x = -this.x + 100;

      switch (this.currentState) {
        case "dead":
          this.handleDead();
          break;
        case "frozen":
          this.handleFrozen();
          console.log(this.currentState);
          break;
        case "hurt":
          this.handleHurt();
          break;
        case "walking":
          this.handleWalking();
          break;
        case "jumping":
          this.handleJumping();
          break;
        case "long_idle":
          this.handleLongIdle();
          break;
        case "idle":
          this.handleIdle();
          break;
      }

      this.updateVerticalHistory();
    }, 1000 / 30);
  }

  /**
   * Shifts Y position history for smoother vertical movement tracking.
   */
  updateVerticalHistory() {
    this.lastY3 = this.lastY2;
    this.lastY2 = this.lastY;
    this.lastY = this.y;
  }

  /**
   * Handles the character's death animation and final frame.
   * Plays the dying sound once, cycles through the death frames,
   * and sets the last frame statically at the end.
   */
  handleDead() {
    if (this.currentState === "dead") {
      if (this.currentImage < this.IMAGES_DYING.length) {
        SoundManager.playOne(SoundManager.CHARACTER_DEAD, 1, 0.3, 2000);
        if (this.skipFrame % this.frameDelay.dead === 0) {
          this.playAnimation(this.IMAGES_DYING);
        }
      } else {
        this.img = this.imageCache["assets/img/2_character_pepe/5_dead/D-57.png"];
      }
      this.skipFrame += 1;
    }
  }

  /**
   * Handles the character's behavior during the frozen state (e.g. game intro).
   * Plays the idle animation at the idle frame rate, without applying movement or logic.
   */
  handleFrozen() {
    if (this.currentState === "frozen") {
      if (this.skipFrame % this.frameDelay.idle === 0) {
        this.playAnimation(this.IMAGES_IDLE);
      }

      this.skipFrame += 1;
    }
  }

  /**
   * Handles the character's reaction to being hurt.
   * Triggers the hurt animation and plays the associated sound effect.
   */
  handleHurt() {
    if (this.currentState === "hurt") {
      this.playAnimation(this.IMAGES_HURT);
      SoundManager.playOne(SoundManager.CHARACTER_HURT, 1, 0.4, 1500);
    }
  }

  /**
   * Handles the walking state of the character.
   * Plays the walking animation, moves the character left or right
   * depending on keyboard input, allows jumping, and plays footstep sounds.
   *
   * Movement is restricted by map boundaries and blocking objects.
   */
  handleWalking() {
    if (this.currentState === "walking") {
      this.playAnimation(this.IMAGES_WALKING);
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        !this.isblockedRight()
      ) {
        this.otherDirection = false;
        this.moveRight();
      }

      if (this.world.keyboard.LEFT && this.x > -200 && !this.isblockedLeft()) {
        this.otherDirection = true;
        this.moveLeft();
      }

      if (this.world.keyboard.SPACE) {
        this.jump();
      }

      if (
        (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) ||
        (this.world.keyboard.LEFT && this.x > -100)
      ) {
        SoundManager.playOne(SoundManager.CHARACTER_WALK, 4, 0.3, 160, false, 0);
      }
    }
  }

  /**
   * Handles the jumping state of the character.
   * Plays the jumping animation at the configured frame delay and
   * allows horizontal movement while airborne if the path is not blocked.
   */
  handleJumping() {
    if (this.currentState === "jumping") {
      if (this.skipFrame % this.frameDelay.jumping === 0) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        !this.isblockedRight()
      ) {
        this.moveRight();
      }

      if (this.world.keyboard.LEFT && this.x > -200 && !this.isblockedLeft()) {
        this.moveLeft();
      }
      this.skipFrame += 1;
    }
  }

  /**
   * Handles the long idle state of the character (e.g. when idle for an extended time).
   * Plays a longer idle animation, triggers a special sound,
   * and allows jumping to exit the idle state.
   */
  handleLongIdle() {
    if (this.currentState === "long_idle") {
      if (this.skipFrame % this.frameDelay.longIdle === 0) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        SoundManager.playOne(SoundManager.CHARACTER_LONG_IDLE, 1, 0.3, 3700);
      }

      if (this.world.keyboard.SPACE) {
        this.jump();
      }

      this.skipFrame += 1;
    }
  }

  /**
   * Handles the idle state of the character.
   * Plays the idle animation at a slower frame rate and
   * allows jumping at any time to interrupt the idle state.
   */
  handleIdle() {
    if (this.currentState === "idle") {
      if (this.skipFrame % this.frameDelay.idle === 0) {
        this.playAnimation(this.IMAGES_IDLE);
      }

      if (this.world.keyboard.SPACE) {
        this.jump();
      }

      this.skipFrame += 1;
    }
  }

  /**
   * Updates the character's current state based on internal conditions and user input.
   * Evaluates priority from top (death) to bottom (idle) and applies state changes accordingly.
   * Triggers image reset and frame skipping reset when a new state is entered.
   */
  updateState() {
    let newState;

    if (this.isDead()) {
      newState = "dead";
    } else if (this.world.isPlayingIntro()) {
      newState = "frozen";
    } else if (this.isHurt()) {
      newState = "hurt";
    } else if (this.isAboveGround()) {
      newState = "jumping";
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      newState = "walking";
    } else if (this.isLongIdle() && !this.world.bossTriggered) {
      newState = "long_idle";
    } else {
      newState = "idle";
    }

    if (newState !== this.currentState) {
      this.resetCurrentImage();
      this.resetSkipFrame();
    }
    this.currentState = newState;
  }

  /**
   * Checks if the character is blocked by an obstacle on the right side.
   *
   * @returns {boolean} True if an obstacle is touching the character from the left.
   */
  isblockedRight() {
    return this.world.level.obstacles.some((obstacle) => this.isTouchingFromLeft(obstacle));
  }

  /**
   * Checks if the character is blocked by an obstacle on the left side.
   *
   * @returns {boolean} True if an obstacle is touching the character from the right.
   */
  isblockedLeft() {
    return this.world.level.obstacles.some((obstacle) => this.isTouchingFromRight(obstacle));
  }

  /**
   * Checks if the character is standing on top of an obstacle.
   *
   * @returns {boolean} True if an obstacle is touching the character from below.
   */
  isOnTop() {
    return this.world.level.obstacles.some((obstacle) => this.isTouchingFromTop(obstacle));
  }
}
