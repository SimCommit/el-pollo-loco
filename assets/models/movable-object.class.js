// movable-object.class.js

class MovableObject {
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  health = 100;
  // onCooldown = false;
  // isHurt = false;
  lastHit = 0;

  //   loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') <img id="image">
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 220;
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
      timePassed = timePassed / 1000;                       // Difference in s
      return timePassed < 1;
    }
  
  // hit() {

  //   if (this.onCooldown) return;

  //   this.health -= 5;
  //   this.isHurt = true;
  //   this.rebound();
  //   this.onCooldown = true;

  //   if (this.health < 0) {
  //     this.health = 0;
  //   }

  //   console.log("Collision, new Health: ", this.health);

  //   setTimeout(() => {
  //     this.isHurt = false;
  //   }, 1000);

  //   setTimeout(() => {
  //     this.onCooldown = false;
  //   }, 2000);
  // }

  isDead() {
    return this.health == 0;
  }

  // getDamage(target) {
  //   if (this.onCooldown) return;
  //   target.health -= 25;
  //   target.rebound();
  //   console.log("Collision, new Health: ", target.health);
  //   this.onCooldown = true;
  //   setTimeout(() => {
  //     this.onCooldown = false;
  //   }, 1000);
  // }

  rebound() {
    this.x -= 25;
    setTimeout(() => {
      this.x -= 50;
    }, 100);
    setTimeout(() => {
      this.x -= 25;
    }, 200);
  }

  // deadAnimation() {

  // }

  // isDead() {
  //   if (this.health <= 0) this.dying = true;
  // }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // Real hitboxes (with gpt)
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";

      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );

      ctx.stroke();
    }
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

  // playSingleAnimation(images) {
  //   let i = this.currentImage;
  //   if (i >= images.length) {
  //     return;
  //   }
  //   let path = images[i];
  //   this.img = this.imageCache[path];
  //   this.currentImage++;
  // }

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
