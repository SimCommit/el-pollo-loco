class MovableObject {
  x = 120;
  y = 285;
  img;
  heigth = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;


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

  moveRight() {
    console.log("Moving Right");
  }

  // moveLeft(x) {
  //   console.log("Moving Left");

  //   for (let i = 0; i < 100; i++) {
  //     setTimeout((x) => {
  //       x - i;
  //     }, 100);
  //   }
  // }
}
