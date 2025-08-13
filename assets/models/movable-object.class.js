// movable-object.class.js

/**
 * @class MovableObject
 * @extends DrawableObject
 *
 * Base class for all objects that can move and be affected by gravity or collision.
 */
class MovableObject extends DrawableObject {
  /**
   * Current health value of the object (0–100).
   * @type {number}
   */
  health = 100;

  /**
   * Timestamp of the last time the object was damaged.
   * Used for invincibility or damage cooldown.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Timestamp when temporary invincibility was triggered.
   * Used to track invincibility duration.
   * @type {number}
   */
  invincibleTrigger = 0;

  /**
   * Horizontal acceleration value (e.g. for running, knockback).
   * @type {number}
   */
  accelerationX = 1;

  // /**
  //  * Duration (in seconds) the object remains stunned after taking damage.
  //  * @type {number}
  //  */
  // stunTime = 1;

  /**
   * Duration (in seconds) the object remains invincible after taking damage.
   * @type {number}
   */
  invincibleTime = 1.5;

  /**
   * Time threshold (in seconds) after which the object enters long idle state.
   * Used to trigger special animations or behaviors.
   * @type {number}
   */
  longIdleThreshold = 10;

  /**
   * Counter used to control animation frame skipping.
   * @type {number}
   */
  skipFrame = 0;

  /**
   * Indicates whether the object is currently in cooldown and cannot perform certain actions.
   * @type {boolean}
   */
  hitOnCooldown = false;

  /**
   * Vertical margin to adjust how precisely top collisions are detected.
   * Helps avoid flickering or false positives.
   * @type {number}
   */
  TOP_COLLISION_MARGIN = 20;

  /**
   * Minimum height required to consider side collisions.
   * Prevents unintended side collision logic for very small objects.
   * @type {number}
   */
  SIDE_COLLISION_IGNORE_HEIGHT = 30;

  /**
   * Applies gravity to the object by continuously updating its vertical position.
   * Gravity affects the object only when it is in the air or falling.
   * Called at a fixed interval (25 FPS).
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Applies horizontal force to the object based on its current speed and direction.
   * Used for knockback or sliding effects. Gradually slows down due to acceleration.
   * Called at a fixed interval (25 FPS).
   */
  applyHorizontalForce() {
    setStoppableInterval(() => {
      if (this.speedX < 0 && this.x <= this.world.getLeftBoundary() + 2) {
        this.speedX = 0;
      } else if (this.speedX > 0 && this.x >= this.world.level.level_end_x - 2) {
        this.speedX = 0;
      } else if (this.speedX < 0) {
        this.x += this.speedX;
        this.speedX += this.accelerationX;
      } else if (this.speedX > 0) {
        this.x += this.speedX;
        this.speedX -= this.accelerationX;
      }
    }, 1000 / 25);
  }

  /**
   * Checks whether the object is currently in the air.
   * Returns true unless it is on top of an object or resting on the ground.
   * Throwable objects are always considered above ground.
   * @returns {boolean} True if the object is in the air.
   */
  isAboveGround() {
    if (this.isBroken) {
      return false;
    } else if (this instanceof ThrowableObject) {
      return true;
    } else if (this instanceof Endboss) {
      return this.y < 145;
    } else if (this.isOnTop()) {
      return false;
    } else {
      return this.y < 220;
    }
  }

  /**
   * Processes a hit on the object, applying damage, triggering cooldown,
   * and handling rebound effects if the object survives.
   *
   * @param {number} damage - The amount of damage to apply.
   * @param {string} direction - The direction from which the hit came (used for rebound logic).
   */
  hit(damage, direction) {
    if (!this.hitOnCooldown && !world.endscreenTriggered) {
      this.takeDamage(damage);
      this.handleHitCooldown();
    }

    if (this.health > 0) {
      this.updateHitTimestamps();
      this.rebound(direction);
    }
  }

  /**
   * Applies damage to the object and ensures health does not drop below zero.
   *
   * @param {number} damage - The amount of damage to subtract from health.
   */
  takeDamage(damage) {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  /**
   * Activates a temporary cooldown during which the object cannot be hit again.
   */
  handleHitCooldown() {
    this.hitOnCooldown = true;
    setTimeout(() => {
      this.hitOnCooldown = false;
    }, 1000);
  }

  /**
   * Updates all relevant timestamps for hit, invincibility, and input.
   */
  updateHitTimestamps() {
    const now = Date.now();
    this.lastHit = now;
    this.invincibleTrigger = now;
    lastInput = now;
  }

  /**
   * Disables the object's hitbox by moving its top offset far outside the visible range.
   * Used to prevent further collisions after death or collection.
   */
  disableHitbox() {
    this.offset.top = 504;
  }

  /**
   * Applies a rebound force to the object based on the given direction.
   * Simulates knockback after being hit.
   *
   * @param {string} direction - The direction of impact ("left", "right", or "up-left").
   */
  rebound(direction) {
    switch (direction) {
      case "up-left":
        this.speedY = 15;
        this.speedX = -15;
        break;
      case "right":
        this.speedX = 15;
        break;
      case "left":
        this.speedX = -15;
        break;
    }
  }

  /**
   * Checks if the object is currently in a hurt (stunned) state.
   * Based on the time passed since the last hit.
   *
   * @returns {boolean} True if the stun duration is still active.
   */
  isHurt(stunTime = 1) {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed < stunTime;
  }

  /**
   * Checks if the object is currently invincible.
   * Based on the time passed since invincibility was triggered.
   *
   * @returns {boolean} True if the invincibility duration is still active.
   */
  isInvincible() {
    let timePassed = new Date().getTime() - this.invincibleTrigger; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed < this.invincibleTime;
  }

  /**
   * Checks whether the object has no health left.
   *
   * @returns {boolean} True if health is 0.
   */
  isDead() {
    return this.health == 0;
  }

  /**
   * Checks whether the object has been idle for longer than the defined threshold.
   * Based on the time passed since the last user input.
   *
   * @returns {boolean} True if idle duration exceeds the threshold.
   */
  isLongIdle() {
    let timePassed = new Date().getTime() - lastInput; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed > this.longIdleThreshold;
  }

  /**
   * Checks whether this object is currently above another object,
   * using multiple vertical position snapshots for more accurate detection.
   *
   * @param {DrawableObject} other - The object to compare against.
   * @returns {boolean} True if this object was above the other in recent frames.
   */
  isHigher(other) {
    return (
      this.lastY + this.height - this.offset.bottom <= other.getHitboxBorderTop() ||
      this.lastY2 + this.height - this.offset.bottom <= other.getHitboxBorderTop() ||
      this.lastY3 + this.height - this.offset.bottom <= other.getHitboxBorderTop()
    );
  }

  /**
   * Checks whether the object is currently falling (i.e. moving downward).
   *
   * @returns {boolean} True if vertical speed is negative.
   */
  isFalling() {
    return this.speedY < 0;
  }

  /**
   * Checks whether this object is colliding with another object from the left side.
   * Used to detect left-side obstruction or wall collisions.
   *
   * @param {DrawableObject} other - The object to test collision against.
   * @returns {boolean} True if touching the other object from the left.
   */
  isTouchingFromLeft(other) {
    return (
      this.getHitboxBorderRight() >= other.getHitboxBorderLeft() &&
      this.getHitboxBorderRight() <= other.getHitboxBorderRight() &&
      this.getHitboxBorderBottom() >
        other.getHitboxBorderTop() + this.SIDE_COLLISION_IGNORE_HEIGHT &&
      this.getHitboxBorderBottom() < other.getHitboxBorderBottom()
    );
  }

  /**
   * Checks whether this object is colliding with another object from the right side.
   *
   * @param {DrawableObject} other - The object to test collision against.
   * @returns {boolean} True if touching the other object from the right.
   */
  isTouchingFromRight(other) {
    return (
      this.getHitboxBorderLeft() <= other.getHitboxBorderRight() &&
      this.getHitboxBorderLeft() >= other.getHitboxBorderLeft() &&
      this.getHitboxBorderBottom() >
        other.getHitboxBorderTop() + this.SIDE_COLLISION_IGNORE_HEIGHT &&
      this.getHitboxBorderBottom() < other.getHitboxBorderBottom()
    );
  }

  /**
   * Checks whether this object is touching the top surface of another object.
   * Typically used to determine whether the object is standing on something.
   *
   * @param {DrawableObject} other - The object to test collision against.
   * @returns {boolean} True if this object is touching the other from above.
   */
  isTouchingFromTop(other) {
    return (
      this.getHitboxBorderRight() > other.getHitboxBorderLeft() &&
      this.getHitboxBorderLeft() < other.getHitboxBorderRight() &&
      this.getHitboxBorderBottom() >= other.getHitboxBorderTop() &&
      this.getHitboxBorderBottom() <= other.getHitboxBorderTop() + this.TOP_COLLISION_MARGIN &&
      this.speedY <= 0
    );
  }

  /**
   * Moves the object to the right by increasing its x position based on speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by decreasing its x position based on speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   * Also plays the jump sound via the SoundManager.
   *
   * @param {number} [speedY=15] - The upward speed to apply when jumping.
   */
  jump(speedY = 15) {
    this.speedY = speedY;
    SoundManager.playOne(SoundManager.CHARACTER_JUMP, 1, 0.1, 500);
  }

  /**
   * Plays an animation sequence at the defined frame delay.
   * Increments the frame counter after each call.
   *
   * @param {string[]} images - Array of image paths representing the animation.
   * @param {number} frameDelay - Delay in frames between each animation step.
   */
  playStateAnimation(images, frameDelay) {
    if (this.skipFrame % frameDelay === 0) {
      this.playAnimation(images);
    }
    this.skipFrame += 1;
  }

  /**
   * Calculates the number of seconds that have passed since a given timestamp.
   *
   * @param {number} startTimestamp - Timestamp in milliseconds to compare against the current time.
   * @returns {number} Seconds that have passed since the given timestamp.
   */
  secondsSince(startTimestamp) {
    return (new Date().getTime() - startTimestamp) / 1000;
  }

  /**
   * Resets the skipFrame counter to 0.
   * Used to synchronize animation timing.
   *
   * @returns {number} The new skipFrame value (0).
   */
  resetSkipFrame() {
    return (this.skipFrame = 0);
  }

  /**
   * Resets the animation frame index to 0.
   * Typically called when switching animations.
   *
   * @returns {number} The new frame index (0).
   */
  resetCurrentImage() {
    return (this.currentImage = 0);
  }

  /**
   * Executes the throwing behavior of the object.
   * Initializes size and speed, applies direction, gravity and plays sound.
   * Starts horizontal movement via interval.
   */
  throw() {
    if (world.endscreenTriggered) return;
    this.setThrowValues();
    SoundManager.playOne(SoundManager.CHARACTER_THROW, 1, 0.2, 500);
    this.applyGravity();
    if (world.character.otherDirection) {
      this.speedX = this.speedX * -1;
    }
    setStoppableInterval(() => {
      this.x += this.speedX;
    }, 25);
  }

  /**
   * Sets default size and initial speed values for a thrown object.
   */
  setThrowValues() {
    this.width = 50;
    this.height = 50;
    this.speedY = 15;
    this.speedX = 5;
  }
}
