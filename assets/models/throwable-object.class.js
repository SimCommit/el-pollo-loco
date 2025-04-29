// throwable-object.class.js

class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  
  IMAGES_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  acceleration = 1;
  isBroken = false;

  constructor(x, y) {
    super();
    this.loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.throw();
    this.animate();
  }

  throw() {
    this.width = 50;
    this.height = 50;
    this.speedY = 15;
    this.speedX = 5;
    this.applyGravity();
    setInterval(() => {
      this.x += this.speedX;
    }, 25);
  }

  animate() {

    // 
    if (this.isBroken) {
      setInterval(() => {
        this.playAnimation(this.IMAGES_SPLASH);
      }, 1000 / 12);
    } else {
      setInterval(() => {
        this.playAnimation(this.IMAGES_ROTATION);
      }, 1000 / 12);
    }
  }
}
