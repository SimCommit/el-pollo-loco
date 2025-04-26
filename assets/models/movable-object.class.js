// movable-object.class.js

class MovableObject {
  // x = 120;
  // y = 285;
  // heigth = 150;
  // width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;

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
    ctx.drawImage(this.img, this.x, this.y, this.width, this.heigth);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.heigth);
      ctx.stroke();
    }
  }

  // character.isColliding(chicken); e.g.
  isColliding(mo) {
    return (
      this.x + this.width >= mo.x &&
      this.y + this.heigth >= mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.heigth
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
