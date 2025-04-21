class Skybox extends MovableObject {
  width = 720;
  heigth = 480;
  x = 0;
  y = 0;

  constructor() {
    super().loadImage("../assets/img/5_background/layers/air.png");
  }
}
