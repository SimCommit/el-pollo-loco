// endboss-behavior.js

/**
 * Starts the animation loop for the Endboss.
 * Updates the animation state and handles behavior based on the current state.
 *
 * Runs at a fixed interval of 30 FPS.
 */
Endboss.prototype.animate = function () {
  setStoppableInterval(() => {
    this.updateState();
    this.handleCurrentState();
    this.preventBossLeavingBoundaries();
  }, 1000 / 30);
};

/**
 * Executes the main behavior logic based on the current state.
 * Delegates handling to the corresponding `handle<State>` method.
 */
Endboss.prototype.handleCurrentState = function () {
  switch (this.currentState) {
    case "dead":
      this.handleDead();
      break;
    case "intro":
      this.handleIntro();
      break;
    case "prepare":
      this.handlePrepare();
      break;
    case "attack":
      this.handleAttack();
      break;
    case "hurt":
      this.handleHurt();
      break;
    case "recover":
      this.handleRecover();
      break;
    case "alert":
      this.handleAlert();
      break;
    case "walking":
      this.handleWalking();
      break;
  }
};

/**
 * Prevents the boss from moving outside its allowed horizontal range.
 * Clamps `x` between `minX` and `maxX`.
 */
Endboss.prototype.preventBossLeavingBoundaries = function () {
  if (this.x < this.minX) {
    this.x = this.minX;
  } else if (this.x > this.maxX) {
    this.x = this.maxX;
  }
};

/**
 * Handles the Endboss behavior during the "dead" state.
 * Plays the death animation and triggers sound effects.
 * Once the animation is complete, the hitbox is disabled.
 */
Endboss.prototype.handleDead = function () {
  if (this.currentState === "dead") {
    this.canTakeDamage = false;

    if (this.currentImage < this.IMAGES_DEAD.length) {
      if (this.skipFrame % this.frameDelay.dead === 0) {
        this.playAnimation(this.IMAGES_DEAD);
        SoundManager.playOne(SoundManager.BOSS_HURT, 1, 0.3, 10000);
        SoundManager.playOne(SoundManager.BOSS_DEAD, 1, 0.4, 10000);
      }
    } else {
      this.img = this.imageCache["assets/img/4_enemie_boss_chicken/5_dead/G26.png"];
      this.disableHitbox();
    }
    this.skipFrame += 1;
  }
};

/**
 * Handles the Endboss behavior during the "intro" state.
 * Plays walking, then alert animation with timing gates.
 */
Endboss.prototype.handleIntro = function () {
  this.canTakeDamage = false;
  let timePassed = this.secondsSince(this.introStart);

  if (timePassed < 1.8) {
    this.playStateAnimation(this.IMAGES_WALKING, this.frameDelay.intro1);
    this.moveLeft();
  }

  if (timePassed >= 1.8 && timePassed < 2.5) {
    this.playStateAnimation(this.IMAGES_ALERT, this.frameDelay.alert);
  }
};

/**
 * Handles the Endboss behavior during the "hurt" state.
 * Plays the hurt animation and triggers the corresponding sound effect.
 */
Endboss.prototype.handleHurt = function () {
  if (this.currentState === "hurt") {
    this.canTakeDamage = false;
    this.playStateAnimation(this.IMAGES_HURT, this.frameDelay.hurt);
    SoundManager.playOne(SoundManager.BOSS_HURT_2, 1, 0.7, 2000);
    SoundManager.playOne(SoundManager.BOSS_HURT, 1, 0.3, 3000);
  }
};

/**
 * Handles the Endboss behavior during the "prepare" state.
 * Plays the prepare animation and sets the attack flag after a short delay.
 */
Endboss.prototype.handlePrepare = function () {
  if (this.currentState === "prepare") {
    this.canTakeDamage = false;
    let timePassed = this.secondsSince(this.prepareStart);
    this.playStateAnimation(this.IMAGES_PREPARE, this.frameDelay.prepare);

    if (timePassed > 0.7) {
      this.isAttacking = true;
    }
  }
};

/**
 * Handles the Endboss behavior during the "attack" state.
 *
 * - Plays the attack animation for the first 1.4 seconds
 * - Between 1.4 and 1.7 seconds plays landing frames
 * - After 1.7 seconds ends attack state
 */
Endboss.prototype.handleAttack = function () {
  if (this.currentState === "attack") {
    let timePassed = this.secondsSince(this.attackStart);
    this.canTakeDamage = false;

    if (timePassed < 1.4) {
      this.playStateAnimation(this.IMAGES_ATTACK, this.frameDelay.attack);
      this.speed = 8;
      SoundManager.playOne(SoundManager.BOSS_ATTACK, 1, 0.3, 2000);
      this.moveLeft();
    } else if (timePassed < 1.7) {
      this.playStateAnimation(this.IMAGES_LANDING, this.frameDelay.landing);
    } else {
      this.endAttackstate();
    }
  }
};

/**
 * Ends the "attack" state.
 * Sets flags for cooldown and transitions into the "recover" state.
 */
Endboss.prototype.endAttackstate = function () {
  this.hasRecentlyAttacked = true;
  this.isAttacking = false;
  this.isRecovering = true;
};

/**
 * Handles the Endboss behavior during the "recover" state.
 * - First flies right while vulnerable
 * - Plays landing animation
 * - Ends the recover state after a short delay
 */
Endboss.prototype.handleRecover = function () {
  if (this.currentState === "recover") {
    this.canTakeDamage = true;
    let timePassed = this.secondsSince(this.recoverStart);

    if (timePassed < 1.55) {
      this.canTakeDamage = true;
      this.speed = 7;
      this.fly();
      this.moveRight();
      this.playStateAnimation(this.IMAGES_FLYING, this.frameDelay.flying);
    } else if (timePassed < 1.8) {
      this.playStateAnimation(this.IMAGES_LANDING, this.frameDelay.landing);
    } else {
      this.endRecoverState();
    }
  }
};

/**
 * Ends the "recover" state.
 * Locks walking until `setDelayFlags` re-enables it.
 */
Endboss.prototype.endRecoverState = function () {
  this.isRecovering = false;
  this.isAllowedToWalk = false;
};

/**
 * Handles the Endboss behavior during the "alert" state.
 * Plays the alert animation at the defined frame rate.
 */
Endboss.prototype.handleAlert = function () {
  this.canTakeDamage = true;
  this.playStateAnimation(this.IMAGES_ALERT, this.frameDelay.alert);
};

/**
 * Handles the Endboss behavior during the "walking" state.
 * Moves left until reaching `minX`, or right after a recent attack until `maxX`.
 */
Endboss.prototype.handleWalking = function () {
  this.canTakeDamage = false;
  this.playStateAnimation(this.IMAGES_WALKING, this.frameDelay.walking);

  if (this.x > this.minX) {
    this.speed = 4;
    this.moveLeft();
  } else if (this.hasRecentlyAttacked && this.x < this.maxX) {
    this.speed = 4;
    this.moveRight();
  }
};

/**
 * Updates the current state of the Endboss based on behavior logic.
 * If the state has changed, resets animation tracking and sets relevant timestamps.
 */
Endboss.prototype.updateState = function () {
  let newState = this.resolveState();

  if (newState !== this.currentState) {
    if (newState === "attack") {
      this.hasJumpedThisAttack = false;
    }

    if (newState === "recover") {
      this.setDelayFlags();
    }

    if (this.currentState === "hurt") {
      this.hasRecentlyAttacked = false;
    }
    this.resetAnimationAndTimestamps(newState);
  }

  this.currentState = newState;
};

/**
 * Determines the next logical state of the Endboss based on its condition and environment.
 *
 * @returns {string} The resolved state: "dead", "intro", "hurt", "attack", "walking", or "alert".
 */
Endboss.prototype.resolveState = function () {
  if (this.isDead()) {
    return "dead";
  } else if (this.world.isPlayingIntro()) {
    return "intro";
  } else if (this.canStartAttack()) {
    return "prepare";
  } else if (this.isLockedToAttack()) {
    return "attack";
  } else if (this.isHurt(2)) {
    return "hurt";
  } else if (this.isLockedToRecover()) {
    return "recover";
  } else if (this.isAllowedToWalk) {
    return "walking";
  } else {
    return "alert";
  }
};

/**
 * Resets animation counters and updates timestamps for relevant states.
 *
 * @param {string} newState - The state being entered.
 */
Endboss.prototype.resetAnimationAndTimestamps = function (newState) {
  this.resetCurrentImage();
  this.resetSkipFrame();
  this.prepareStart = this.timestampIfState("prepare", newState);
  this.attackStart = this.timestampIfState("attack", newState);
  this.recoverStart = this.timestampIfState("recover", newState);
  this.introStart = this.timestampIfState("intro", newState);
};

/**
 * Returns a new timestamp if the given state matches the new state.
 * Otherwise returns the previously stored timestamp for that state.
 *
 * @param {string} state - The state to compare against.
 * @param {string} newState - The currently evaluated new state.
 * @returns {number} A new timestamp (in ms) or the existing one for the given state.
 */
Endboss.prototype.timestampIfState = function (state, newState) {
  if (newState === state) {
    return new Date().getTime();
  } else {
    return this[state + "Start"];
  }
};

/**
 * Schedules delayed changes to movement and attack cooldown flags
 * after the recover state begins.
 */
Endboss.prototype.setDelayFlags = function () {
  setTimeout(() => {
    this.isAllowedToWalk = true;
  }, 4000);
  setTimeout(() => {
    this.hasRecentlyAttacked = false;
  }, 5000);
};

/**
 * Checks whether the boss can start a new attack.
 *
 * @returns {boolean} True if attack conditions are met.
 */
Endboss.prototype.canStartAttack = function () {
  if (this.hasRecentlyAttacked || !this.world.isCloseToCharacter(this, 400) || this.isAttacking) {
    return false;
  } else {
    return true;
  }
};

/**
 * Checks if the boss is currently locked into the attack state.
 *
 * @returns {boolean} True if attacking and not recently attacked.
 */
Endboss.prototype.isLockedToAttack = function () {
  return !this.hasRecentlyAttacked && this.isAttacking;
};

/**
 * Checks if the boss is currently locked into the recover state.
 *
 * @returns {boolean} True if recovering after a recent attack.
 */
Endboss.prototype.isLockedToRecover = function () {
  return this.hasRecentlyAttacked && !this.isAttacking && this.isRecovering;
};

/**
 * Makes the boss perform a jump during the attack phase, if not already done.
 */
Endboss.prototype.fly = function () {
  if (this.hasJumpedThisAttack) return;
  this.jump(18);
  this.hasJumpedThisAttack = true;
};
