// world.class.js

class World {
  backgroundObjects = [
    new BackgroundObject("../assets/img/5_background/layers/air.png", -719),
    new BackgroundObject("../assets/img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("../assets/img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("../assets/img/5_background/layers/1_first_layer/2.png", -719),
    new BackgroundObject("../assets/img/5_background/layers/air.png", 0),
    new BackgroundObject("../assets/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("../assets/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("../assets/img/5_background/layers/1_first_layer/1.png", 0),
  ];
  clouds = [new Cloud()];
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // ???
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.extendBackgroundObjects();
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  extendBackgroundObjects() {
    for (let i = 1; i < 3; i++) {
      this.factor = i * 719;
      this.backgroundObjects.push(
        new BackgroundObject("../assets/img/5_background/layers/air.png", 0 + this.factor),
        new BackgroundObject("../assets/img/5_background/layers/3_third_layer/2.png", 0 + this.factor),
        new BackgroundObject("../assets/img/5_background/layers/2_second_layer/2.png", 0 + this.factor),
        new BackgroundObject("../assets/img/5_background/layers/1_first_layer/2.png", 0 + this.factor),
        new BackgroundObject("../assets/img/5_background/layers/air.png", 719 + this.factor),
        new BackgroundObject("../assets/img/5_background/layers/3_third_layer/1.png", 719 + this.factor),
        new BackgroundObject("../assets/img/5_background/layers/2_second_layer/1.png", 719 + this.factor),
        new BackgroundObject("../assets/img/5_background/layers/1_first_layer/1.png", 719 + this.factor),
      );
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    this.ctx.translate(-this.camera_x, 0);

    // The function is repeatedly called via requestAnimationFrame
    requestAnimationFrame(() => {
      this.draw();
    });

    // let self = this;
    // requestAnimationFrame(function () {
    //   self.draw();
    // });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  // mo = movable object
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.heigth);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0); //  shift by object width to prevent "teleporting" when flipping (otherDirection)
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
