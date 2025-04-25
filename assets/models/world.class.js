// world.class.js

class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // ???
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    // The function is repeatedly called via requestAnimationFrame (thanks to Michelle)
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

// extendBackgroundObjects() {
//   this.segmentWidth = 719;

//   for (let i = 0; i < 3; i++) {
//     this.baseX = i * this.segmentWidth * 2;
//     this.backgroundObjects.push(
//       new BackgroundObject("../assets/img/5_background/layers/air.png", this.baseX),
//       new BackgroundObject("../assets/img/5_background/layers/3_third_layer/1.png", this.baseX),
//       new BackgroundObject("../assets/img/5_background/layers/2_second_layer/1.png", this.baseX),
//       new BackgroundObject("../assets/img/5_background/layers/1_first_layer/1.png", this.baseX),
//       new BackgroundObject(
//         "../assets/img/5_background/layers/air.png",
//         this.baseX + this.segmentWidth
//       ),
//       new BackgroundObject(
//         "../assets/img/5_background/layers/3_third_layer/2.png",
//         this.baseX + this.segmentWidth
//       ),
//       new BackgroundObject(
//         "../assets/img/5_background/layers/2_second_layer/2.png",
//         this.baseX + this.segmentWidth
//       ),
//       new BackgroundObject(
//         "../assets/img/5_background/layers/1_first_layer/2.png",
//         this.baseX + this.segmentWidth
//       )
//     );
//   }
// }
