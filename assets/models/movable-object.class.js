// movable-object.class.js

class MovableObject extends DrawableObject {
  health = 100;
  lastHit = 0;
  invincibleTrigger = 0;
  accelerationX = 1;
  stunTime = 1;
  invincibleTime = 2;
  longIdleThreshold = 10;
  skipFrame = 0;
  onCooldown = false;
  TOP_COLLISION_MARGIN = 20;
  SIDE_COLLISION_IGNORE_HEIGHT = 30;

  applyGravity() {
    setStoppableInterval(() => {
      // if (paused) return;
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  applyHorizontalForce() {
    setStoppableInterval(() => {
    // if (paused) return;
      if (this.speedX < 0) {
        this.x += this.speedX;
        this.speedX += this.accelerationX;
      } else if (this.speedX > 0) {
        this.x += this.speedX;
        this.speedX -= this.accelerationX;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this.isBroken) {
      return false;
    } else if (this instanceof ThrowableObject) {
      // Throwable objects should fall through ground
      return true;
    } else if (this.isOnTop()) {
      return false;
    } else {
      return this.y < 220;
    }
  }

  hit(damage, target, direction) {
    if (!this.onCooldown) {
      this.health -= damage;
      // console.log("Hit! New target healt: ", target.health);
      this.onCooldown = true;
      setTimeout(() => {
        this.onCooldown = false;
      }, 1000);
    }

    if (this.health <= 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
      this.invincibleTrigger = new Date().getTime();
      lastInput = new Date().getTime();
      this.rebound(direction);
    }
  }

  disableHitbox() {
    this.offset.top = 504;
  }

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

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed < this.stunTime;
  }

  isInvincible() {
    let timePassed = new Date().getTime() - this.invincibleTrigger; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed < this.invincibleTime;
  }

  isDead() {
    return this.health == 0;
  }

  isLongIdle() {
    let timePassed = new Date().getTime() - lastInput; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed > this.longIdleThreshold;
  }

  isHigher(other) {
    return (
      this.lastY + this.height - this.offset.bottom <= other.getHitboxBorderTop() ||
      this.lastY2 + this.height - this.offset.bottom <= other.getHitboxBorderTop() ||
      this.lastY3 + this.height - this.offset.bottom <= other.getHitboxBorderTop()
    );
  }

  isFalling() {
    return this.speedY < 0;
  }

  isTouchingFromLeft(other) {
    return (
      this.getHitboxBorderRight() >= other.getHitboxBorderLeft() &&
      this.getHitboxBorderRight() <= other.getHitboxBorderRight() &&
      this.getHitboxBorderBottom() >
        other.getHitboxBorderTop() + this.SIDE_COLLISION_IGNORE_HEIGHT &&
      this.getHitboxBorderBottom() < other.getHitboxBorderBottom()
    );
  }

  isTouchingFromRight(other) {
    return (
      this.getHitboxBorderLeft() <= other.getHitboxBorderRight() &&
      this.getHitboxBorderLeft() >= other.getHitboxBorderLeft() &&
      this.getHitboxBorderBottom() >
        other.getHitboxBorderTop() + this.SIDE_COLLISION_IGNORE_HEIGHT &&
      this.getHitboxBorderBottom() < other.getHitboxBorderBottom()
    );
  }

  isTouchingFromTop(other) {
    return (
      this.getHitboxBorderRight() > other.getHitboxBorderLeft() &&
      this.getHitboxBorderLeft() < other.getHitboxBorderRight() &&
      this.getHitboxBorderBottom() >= other.getHitboxBorderTop() &&
      this.getHitboxBorderBottom() <= other.getHitboxBorderTop() + this.TOP_COLLISION_MARGIN &&
      this.speedY <= 0
    );
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump(speedY = 15) {
    this.speedY = speedY;
    SoundManager.playOne(SoundManager.CHARACTER_JUMP, 1, 0.1, 500)
  }

  resetCurrentImage() {
    return (this.currentImage = 0);
  }

  resetSkipFrame() {
    return (this.skipFrame = 0);
  }

  throw() {
    this.width = 50;
    this.height = 50;
    this.speedY = 15;
    this.speedX = 5;
    SoundManager.playOne(SoundManager.CHARACTER_THROW, 1, 0.2, 500)
    this.applyGravity();
    if (world.character.otherDirection) {
      this.speedX = this.speedX * -1;
    }
    setStoppableInterval(() => {
      this.x += this.speedX;
    }, 25);
  }
}
