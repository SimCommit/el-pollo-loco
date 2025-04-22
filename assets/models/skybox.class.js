class Skybox {
  width = 720;
  heigth = 480;
  x = 0;
  y = 0;
  img;

  constructor() {
    this.loadImage("../assets/img/5_background/layers/air.png");
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}