// cloud.class.js

class Cloud extends MovableObject {
  y = 0;
  x = 200;
  heigth = 338;
  width = 600;
  speed = 0.15;

  constructor() {
    super();
    this.loadImage("../assets/img/5_background/layers/4_clouds/1.png");

    this.animate();
  }

  animate() {
    
    setInterval(() => {
      if (this.x < -300) {
        this.x = 2000;
      }
      this.moveLeft();  
    }, 1000 / 60);
  }
}
