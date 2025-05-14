// character-behavior.class.js

/**
 * Starts the animation loop for the character.
 * Updates the animation state, handles character behavior based on state,
 * and tracks Y-position history for smooth motion.
 *
 * Runs at a fixed interval of 30 FPS.
 */
Character.prototype.animate = function () {
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
};

/**
 * Shifts Y position history for smoother vertical movement tracking.
 */
Character.prototype.updateVerticalHistory = function () {
  this.lastY3 = this.lastY2;
  this.lastY2 = this.lastY;
  this.lastY = this.y;
};

/**
 * Handles the character's death animation and final frame.
 * Plays the dying sound once, cycles through the death frames,
 * and sets the last frame statically at the end.
 */
Character.prototype.handleDead = function () {
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
};

/**
 * Handles the character's behavior during the frozen state (e.g. game intro).
 * Plays the idle animation at the idle frame rate, without applying movement or logic.
 */
Character.prototype.handleFrozen = function () {
  if (this.currentState === "frozen") {
    if (this.skipFrame % this.frameDelay.idle === 0) {
      this.playAnimation(this.IMAGES_IDLE);
    }

    this.skipFrame += 1;
  }
};

/**
 * Handles the character's reaction to being hurt.
 * Triggers the hurt animation and plays the associated sound effect.
 */
Character.prototype.handleHurt = function () {
  if (this.currentState === "hurt") {
    this.playAnimation(this.IMAGES_HURT);
    SoundManager.playOne(SoundManager.CHARACTER_HURT, 1, 0.4, 1500);
  }
};

/**
 * Handles the walking state of the character.
 * Plays the walking animation, moves the character based on keyboard input,
 * allows jumping, and plays footstep sounds.
 *
 * Movement is restricted by map boundaries and blocking objects.
 */
Character.prototype.handleWalking = function () {
  if (this.currentState === "walking") {
    this.playAnimation(this.IMAGES_WALKING);
    this.handleWalkingDirection();
    this.handleJumpInput();
    this.handleWalkingSound();
  }
};

/**
 * Moves the character left or right based on directional input.
 * Considers level boundaries and obstacles.
 */
Character.prototype.handleWalkingDirection = function () {
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
};

/**
 * Triggers a jump if a jump input is active (e.g. SPACE key or mobile jump button).
 */
Character.prototype.handleJumpInput = function () {
  if (this.world.keyboard.SPACE) {
    this.jump();
  }
};

/**
 * Plays walking sound when movement input is active and movement is allowed.
 */
Character.prototype.handleWalkingSound = function () {
  if (
    (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) ||
    (this.world.keyboard.LEFT && this.x > -100)
  ) {
    SoundManager.playOne(SoundManager.CHARACTER_WALK, 4, 0.3, 160, false, 0);
  }
};

/**
 * Handles the jumping state of the character.
 * Plays the jumping animation at the configured frame delay and
 * allows horizontal movement while airborne if the path is not blocked.
 */
Character.prototype.handleJumping = function () {
  if (this.currentState === "jumping") {
    if (this.skipFrame % this.frameDelay.jumping === 0) {
      this.playAnimation(this.IMAGES_JUMPING);
    }

    this.handleJumpingDirection();
    this.skipFrame += 1;
  }
};

/**
 * Moves the character left or right while jumping,
 * if movement input is active and the path is not blocked.
 */
Character.prototype.handleJumpingDirection = function () {
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
};

/**
 * Handles the long idle state of the character (e.g. when idle for an extended time).
 * Plays a longer idle animation, triggers a special sound,
 * and allows jumping to exit the idle state.
 */
Character.prototype.handleLongIdle = function () {
  if (this.currentState === "long_idle") {
    if (this.skipFrame % this.frameDelay.longIdle === 0) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      SoundManager.playOne(SoundManager.CHARACTER_LONG_IDLE, 1, 0.3, 3700);
    }

    this.handleJumpInput();
    this.skipFrame += 1;
  }
};

/**
 * Handles the idle state of the character.
 * Plays the idle animation at a slower frame rate and
 * allows jumping at any time to interrupt the idle state.
 */
Character.prototype.handleIdle = function () {
  if (this.currentState === "idle") {
    if (this.skipFrame % this.frameDelay.idle === 0) {
      this.playAnimation(this.IMAGES_IDLE);
    }

    this.handleJumpInput();
    this.skipFrame += 1;
  }
};

/**
 * Updates the character's current state based on internal conditions and user input.
 * Evaluates priority from top (death) to bottom (idle) and applies state changes accordingly.
 * Triggers image reset and frame skipping reset when a new state is entered.
 */
Character.prototype.updateState = function () {
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
};

/**
 * Checks if the character is blocked by an obstacle on the right side.
 *
 * @returns {boolean} True if an obstacle is touching the character from the left.
 */
Character.prototype.isblockedRight = function () {
  return this.world.level.obstacles.some((obstacle) => this.isTouchingFromLeft(obstacle));
};

/**
 * Checks if the character is blocked by an obstacle on the left side.
 *
 * @returns {boolean} True if an obstacle is touching the character from the right.
 */
Character.prototype.isblockedLeft = function () {
  return this.world.level.obstacles.some((obstacle) => this.isTouchingFromRight(obstacle));
};

/**
 * Checks if the character is standing on top of an obstacle.
 *
 * @returns {boolean} True if an obstacle is touching the character from below.
 */
Character.prototype.isOnTop = function () {
  return this.world.level.obstacles.some((obstacle) => this.isTouchingFromTop(obstacle));
};
