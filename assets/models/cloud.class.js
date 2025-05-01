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
    setInterval(() => {
      if (this.x < -500) {
        this.x = 2900;
      }
      this.moveLeft();  
    }, 1000 / 60);
  }
}
