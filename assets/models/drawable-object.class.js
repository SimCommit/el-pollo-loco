// drawable-object.class.js

class DrawableObject {
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  img;
  imageCache = {};
  currentImage = 0;
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

  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.warn(error);
      debugger;
    }
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof CollectibleObject ||
      this instanceof Obstacle
    ) {
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

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  // ?????????????????????????????????????????????????????????????????????????????????????
  // playSound(path, rate, volume, cooldown) { // ???????????????????????????????????????????
  //   let sound = new Audio(path);
  //   sound.playbackRate = rate;
  //   sound.volume = volume;
  //   this.setCooldown(sound.play(), cooldown);
  // }

  setCooldown(fn, cooldown){
    if (this.readyToPlay) {
      fn;
      this.readyToPlay = false;
    }
    setTimeout(() => {
      this.readyToPlay = true;
    }, cooldown);
  }

  isColliding(other) {
    return (
      this.getHitboxBorderRight() >= other.getHitboxBorderLeft() &&
      this.getHitboxBorderLeft() <= other.getHitboxBorderRight() &&
      this.getHitboxBorderBottom() >= other.getHitboxBorderTop() &&
      this.getHitboxBorderTop() <= other.getHitboxBorderBottom()
    );
  }

  // Helpers for isColliding
  getHitboxBorderRight() {
    return this.x + (this.width - this.offset.right);
  }

  getHitboxBorderLeft() {
    return this.x + this.offset.left;
  }

  getHitboxBorderBottom() {
    return this.y + (this.height - this.offset.bottom);
  }

  getHitboxBorderTop() {
    return this.y + this.offset.top;
  }
}
