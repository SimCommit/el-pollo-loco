// endboss-behavior.js

/**
 * Starts the animation loop for the Endboss.
 * Updates the animation state and handles behavior based on the current state.
 *
 * Runs at a fixed interval of 60 FPS.
 */
Endboss.prototype.animate = function () {
  setStoppableInterval(() => {
    this.updateState();
    this.handleCurrentState();
    this.preventBossLeavingBoundaries();
  }, 1000 / 60);
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
    case "retreat":
      this.handleRetreat();
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
    this.playStateAnimation(this.IMAGES_INTRO2, this.frameDelay.intro2);
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
    this.canTakeDamage = true;
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

    if (timePassed < 1.4 && this.x > 2740) {
      this.playStateAnimation(this.IMAGES_ATTACK, this.frameDelay.attack);
      SoundManager.playOne(SoundManager.BOSS_ATTACK, 1, 0.3, 2000);
      this.moveLeft(8 / 2);
    } else if (timePassed < 1.7 || (this.x === 2740 && timePassed < 1.7)) {
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
 * - Controls timing for spawning minions
 */
Endboss.prototype.handleRecover = function () {
  if (this.currentState === "recover") {
    this.canTakeDamage = true;
    let timePassed = this.secondsSince(this.recoverStart);

    if (timePassed < 1.55) {
      this.handleRecoveryMovement(timePassed);
    } else if (timePassed < 1.8) {
      this.playStateAnimation(this.IMAGES_LANDING, this.frameDelay.landing);
    } else {
      this.endRecoverState();
    }
  }
};

/**
 * Handles the recovery movement phase and minion spawning logic.
 * - Executes jump recovery movement
 * - Moves the boss to the right
 * - Plays flying animation
 * - Spawns minion chickens if player has low ammo
 *
 * @param {number} timePassed - Time elapsed since recovery started
 */
Endboss.prototype.handleRecoveryMovement = function (timePassed) {
  this.canTakeDamage = true;
  this.jumpRecover();
  this.moveRight(7 / 2);
  this.playStateAnimation(this.IMAGES_FLYING, this.frameDelay.flying);
  if (this.world.bottleAmmo <= 1) {
    if (timePassed > 0.1 && timePassed < 0.2 && this.world.countMinionsAlive() === 0) {
      this.world.spawnChicken(0);
    } else if (timePassed > 0.3 && timePassed < 0.4 && this.world.countMinionsAlive() === 1) {
      this.world.spawnChicken(1);
    } else if (timePassed > 0.5 && timePassed < 0.6 && this.world.countMinionsAlive() === 2) {
      this.world.spawnChicken(2);
    }
  }
};

/**
 * Handles the boss retreat behavior.
 * Makes the boss move away from the character when minions are present
 * and sets appropriate flags after retreat completion.
 */
Endboss.prototype.handleRetreat = function () {
  if (this.currentState === "retreat") {
    this.canTakeDamage = true;
    this.isAllowedToWalk = false;
    let timePassed = this.secondsSince(this.retreatStart);
    this.playStateAnimation(this.IMAGES_WALKING, this.frameDelay.walking);
    if (timePassed < 2 && this.x < 3800) {
      this.moveRight(7 / 2);
    } else {
      this.hasRecentlyRetreated = true;
      this.isAllowedToWalk = true;
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
  this.canTakeDamage = true;
  this.playStateAnimation(this.IMAGES_WALKING, this.frameDelay.walking);

  if (this.x > this.minX) {
    this.moveLeft(4 / 2);
  } else if (this.hasRecentlyAttacked && this.x < this.maxX) {
    this.moveRight(4 / 2);
  }
};

/**
 * Updates the current state of the Endboss based on behavior logic.
 * When state changes:
 * - Resets attack jump flags
 * - Manages state-specific cooldowns and timers
 * - Updates animation counters and timestamps
 * - Handles hurt state attack cancellation
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

    if (newState === "spawning") {
      this.setSpawningFlags();
    }

    if (newState === "retreat") {
      this.setRetreatFlags();
    }

    if (this.currentState === "hurt") {
      this.hasRecentlyAttacked = false;
    }
    
    this.resetAnimationAndTimestamps(newState);
  }

  this.currentState = newState;
};

/**
 * Initializes spawning state flags and cooldown.
 * - Resets the spawn jump tracking flag
 * - Sets a 6-second timer to re-enable spawning
 */
Endboss.prototype.setSpawningFlags = function () {
  this.hasJumpedThisSpawn = false;
  setTimeout(() => {
    this.hasRecentlySpawned = false;
  }, 6000);
};

/**
 * Manages the retreat state cooldown timer.
 * Sets an 8-second cooldown before allowing another retreat.
 */
Endboss.prototype.setRetreatFlags = function () {
  setTimeout(() => {
    this.hasRecentlyRetreated = false;
  }, 8000);
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
  } else if (this.isLockedToAttack()) {
    return "attack";
  } else if (this.isHurt(2)) {
    return "hurt";
  } else if (this.isLockedToRecover()) {
    return "recover";
  } else if (this.canRetreat()) {
    return "retreat";
  } else if (this.canStartAttack()) {
    return "prepare";
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
  this.retreatStart = this.timestampIfState("retreat", newState);
  this.spawningStart = this.timestampIfState("spawning", newState);
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
 * Checks if the boss should retreat based on minion presence.
 * Boss retreats when minions are alive and retreat is not on cooldown.
 *
 * @returns {boolean} True if retreat conditions are met, false otherwise.
 */
Endboss.prototype.canRetreat = function () {
  return this.world.countMinionsAlive() > 0 && !this.hasRecentlyRetreated;
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
Endboss.prototype.jumpRecover = function () {
  if (this.hasJumpedThisAttack) return;

  this.jump(24);
  this.hasJumpedThisAttack = true;
};
