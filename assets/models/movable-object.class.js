// movable-object.class.js

class MovableObject extends DrawableObject {
  // speed = 0.15;
  health = 100;
  // onCooldown = false;
  lastHit = 0;
  invincibleTrigger = 0;
  // reboundAcceleration = 1;
  stunTime = 1;
  invincibleTime = 2;
  longIdleThreshold = 20;
  skipFrame = 0;
  onCooldown = false;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  // applyHorizontalMovement() {
  //   setInterval(() => {
  //     if (this.isAboveGround) {
  //       this.x += this.speedX;
  //       if (this.speedX > 0) {
  //         this.speedX -= this.acceleration;
  //       }
  //     }
  //   }, 1000 / 25);
  // }

  isAboveGround() {
    if (this.isBroken) {
      return false;
    } else if (this instanceof ThrowableObject) {
      // Throwable objects should fall through ground
      return true;
    } else {
      return this.y < 220;
    }
  }

  hit(damage, target) {

    if (!this.onCooldown) {
      this.health -= damage;
      console.log("Hit! New target healt: ", target.health); 
      this.onCooldown = true;
      setTimeout(() => {
        this.onCooldown = false;
      }, 1000);
    }
    
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
      this.invincibleTrigger = new Date().getTime();
      lastInput = new Date().getTime();
      // this.rebound();
    }

    // console.log("Collision, new Health: ", this.health);
  }

  disableHitbox() {
    this.offset.top = 504;
  }

  rebound() {
    this.x -= 50;
    this.y -= 50;
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
 
  isHigher(mo) {
    return this.lastY + this.height - this.offset.bottom <= mo.y + mo.offset.top;
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
    this.applyGravity();
    if (world.character.otherDirection) {
      this.speedX = this.speedX * -1;
      console.log("OI");
      
    }
    setInterval(() => {
      this.x += this.speedX;
    }, 25);
  }  
}
