// movable-object.class.js

class MovableObject {
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  offsetX = 0;
  offsetRight = 0;
  offsetY = 0;
  offsetBottom = 0;

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
        this.x + this.offsetX,                           // X-Start (verschoben, wenn nötig)
        this.y + this.offsetY,                           // Y-Start (verschoben)
        this.width - this.offsetX - this.offsetRight,    // Breite angepasst
        this.height - this.offsetY - this.offsetBottom   // Höhe angepasst
      );
  
      ctx.stroke();
    }
  }

  // NEW
  isColliding(mo) {
    return (
      this.x + (this.width - this.offsetRight) >= mo.x &&
      (this.x + this.offsetX) <= mo.x + mo.width &&
      this.y + (this.height - this.offsetBottom) >= mo.y &&
      (this.y + this.offsetY) <= mo.y + mo.height
    );
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length;
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
    this.speedY = 20;
  }
}
