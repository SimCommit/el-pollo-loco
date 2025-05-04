// chicken.class.js

class Chicken extends MovableObject {
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  offset = {
    top: 0,
    right: 2,
    bottom: 12,
    left: 0,
  };

  width = 50;
  height = 50;
  y = 375;
  frameDelayWalking = 5;
  health = 30;
  isMarkedForDespawn = false;

  constructor(x) {
    super().loadImage("assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = x + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.35;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.updateState();

      switch (this.currentState) {
        case "dead":
          this.handleDeadChicken();
          break;
        case "walking":
          this.handleWalkingChicken();
          break;
      }
    }, 1000 / 60);
  }

  handleDeadChicken() {
    this.playAnimation(this.IMAGES_DEAD);
    this.disableHitbox();
  }

  handleWalkingChicken() {
    this.moveLeft();

    if (this.skipFrame % this.frameDelayWalking === 0) {
      this.playAnimation(this.IMAGES_WALKING);
    }
    this.skipFrame += 1;
  }

  updateState() {
    let newState;

    if (this.isDead()) {
      newState = "dead";
    } else {
      newState = "walking";
    }

    this.currentState = newState;
  }
}
