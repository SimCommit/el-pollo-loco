// cloud.class.js

class Cloud extends MovableObject {
  y = 0;
  height = 338;
  width = 600;
  speed = 0.15;

  constructor(x, num) {
    super();
    this.loadImage(`assets/img/5_background/layers/4_clouds/${num}.png`);
    this.x = x;
    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
      if (this.x < -750) {
        this.x = 4950;
      }
      this.moveLeft();
    }, 1000 / 60);
  }
}
