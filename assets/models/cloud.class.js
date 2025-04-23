class Cloud extends MovableObject {
  y = 0;
  heigth = 338;
  width = 600;
  x = 200;

  constructor() {
    super();
    this.loadImage("../assets/img/5_background/layers/4_clouds/1.png");
  }

  // animate() {
  //   setInterval(() => {
  //     this.x -= 0.15;
  //     if (this.x < -200) {
  //       this.x = 300;
  //     }
  //   }, 1000 / 60);
  // }

  animate() {
    this.x--;
    if (this.x < -550) {
      this.x = 700;
    }
  }
}
