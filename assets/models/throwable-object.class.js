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
  frameDelayIsBroken = 2;

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

  animate() {
    setInterval(() => {
      this.updateState();

      switch (this.currentState) {
        case "broken":
          this.handleBroken();
          break;
        case "thrown":
          this.handleThrown();
          break;
      }
    }, 1000 / 12);
  }

  handleBroken() {
    if (this.skipFrame % this.frameDelayIsBroken === 0) {
      this.playAnimation(this.IMAGES_SPLASH);
    }
    this.skipFrame += 1;
  }

  handleThrown() {
    this.playAnimation(this.IMAGES_ROTATION);
  }

  updateState() {
    let newState;
    if (this.isBroken) {
      newState = "broken";
    } else {
      newState = "thrown";
    }
    if (newState !== this.currentState) {
      this.resetCurrentImage();
      this.resetSkipFrame();
    }
    this.currentState = newState;
  }
}