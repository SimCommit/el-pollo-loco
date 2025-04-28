// movable-object.class.js

class MovableObject extends DrawableObject {
  speed = 0.15;
  health = 100;
  // onCooldown = false;
  lastHit = 0;
  invincibleTrigger = 0;
  reboundAcceleration = 1;
  stunTime = 1;
  invincibleTime = 2;
  longIdleThreshold = 5;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  applyHorizontalMovement() {
    setInterval(() => {
      if (this.isAboveGround) {
        this.x += this.speedX;
        if (this.speedX > 0) {
          this.speedX -= this.acceleration;
        }
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable objects should fall through ground
      return true;
    } else {
      return this.y < 220;
    }
  }

  hit() {
    this.health -= 2;

    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
      this.invincibleTrigger = new Date().getTime();
      this.lastInput = new Date().getTime();
    }

    // console.log("Collision, new Health: ", this.health);
  }

  rebound() {
    this.x -= 5 ;
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

  isColliding(mo) {
    return (
      this.getHitboxRight() >= mo.getHitboxLeft() &&
      this.getHitboxLeft() <= mo.getHitboxRight() &&
      this.getHitboxBottom() >= mo.getHitboxTop() &&
      this.getHitboxTop() <= mo.getHitboxBottom()
    );
  }

  // Helpers for isColliding
  getHitboxRight() {
    return this.x + (this.width - this.offset.right);
  }
  
  getHitboxLeft() {
    return this.x + this.offset.left;
  }
  
  getHitboxBottom() {
    return this.y + (this.height - this.offset.bottom);
  }
  
  getHitboxTop() {
    return this.y + this.offset.top;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 15;
  }
}
