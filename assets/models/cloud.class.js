class Cloud extends MovableObject {
  y = 0;
  x = 200;
  heigth = 338;
  width = 600;

  constructor() {
    super();
    this.loadImage("../assets/img/5_background/layers/4_clouds/1.png");

    this.animate();
  }

  animate() {
      this.moveLeft();
  }
}
