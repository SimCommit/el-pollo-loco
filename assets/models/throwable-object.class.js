// throwable-object.class.js

class ThrowableObject extends MovableObject {
  speedY = 15;
  speedX = 30;
  acceleration = 1;
  IMAGES_ROTATION = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor() {
    super();
    this.loadImage('assets/img/6_salsa_bottle/salsa_bottle.png')
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = 100;
    this.y = 240;
    this.width = 50;
    this.height = 50;
    this.applyGravity();
    this.applyHorizontalMovement();
  }

  throw() {
    this.playAnimation(this.IMAGES_ROTATION);
  }

  animate() {
    if (this.world.keyboard.D) {
      this.throw();
    }
  }
}
