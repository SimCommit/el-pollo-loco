// movable-object.class.js

class MovableObject extends DrawableObject {
  speed = 0.15;
  health = 100;
  // onCooldown = false;
  lastHit = 0;

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
    if (this instanceof ThrowableObject) { // Throwable objects should fall through ground
      return true;
    } else {
      return this.y < 220;
    }
  }

  hit() {
    this.health -= 5;

    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }

    // console.log("Collision, new Health: ", this.health);
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    // this.setPercentage(this.health);
    return timePassed < 1;
  }

  isDead() {
    return this.health == 0;
  }

  // rebound() {
  //   this.x -= 25;
  //   setTimeout(() => {
  //     this.x -= 50;
  //   }, 100);
  //   setTimeout(() => {
  //     this.x -= 25;
  //   }, 200);
  // }

  isColliding(mo) {
    return (
      this.getHitboxRight() >= mo.getHitboxLeft() &&
      this.getHitboxLeft() <= mo.getHitboxRight() &&
      this.getHitboxBottom() >= mo.getHitboxTop() &&
      this.getHitboxTop() <= mo.getHitboxBottom()
    );
  }

  // Helpers for isColliding
  getHitboxTop() {
    return this.y + this.offset.top;
  }

  getHitboxBottom() {
    return this.y + (this.height - this.offset.bottom);
  }

  getHitboxLeft() {
    return this.x + this.offset.left;
  }

  getHitboxRight() {
    return this.x + (this.width - this.offset.right);
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
    this.speedY = 24;
  }
}
