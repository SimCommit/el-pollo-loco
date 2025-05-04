// chonk.class.js

class Chonk extends Chicken {
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  offset = {
    top: 16,
    right: 16,
    bottom: 24,
    left: 16,
  };

  width = 100;
  height = 100;
  health = 50;
  isHelper = false;

  constructor(x, y = 328, h = false) {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.y = y;
    this.isHelper = h;
    // this.applyGravity();
    this.animate();
  }
  handleDeadChicken() {
    this.playAnimation(this.IMAGES_DEAD);
    this.disableHitbox();
  }
}
