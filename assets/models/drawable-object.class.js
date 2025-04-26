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
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

}
