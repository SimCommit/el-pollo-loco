// chicken.class.js

class Chicken extends MovableObject {
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  offset = {
    top: 0,
    bottom: 12,
    left: 0,
    right: 2,
  }

  width = 50;
  height = 50;
  y = 375;

  constructor() {
    super().loadImage("../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 800 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.35;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();  
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}