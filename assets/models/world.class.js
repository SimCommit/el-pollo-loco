// world.class.js

class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // ???
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          // this.character.getDamage(this.character);
        }
      });
    }, 200);
  }

  

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addToMap(this.statusBar);

    this.ctx.translate(-this.camera_x, 0);

    // The function is repeatedly called via requestAnimationFrame (thanks to Michelle for this)
    requestAnimationFrame(() => {
      this.draw();
    });
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

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    // if (mo instanceof MovableObject) {   // <- nur MovableObjects bekommen Frames
    //   mo.drawFrame(this.ctx);
    // }
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

  // character.isColliding(chicken); e.g.
  // isColliding(mo) {
  //   return (
  //     this.x + this.width >= mo.x &&
  //     this.y + this.height >= mo.y &&
  //     this.x < mo.x &&
  //     this.y < mo.y + mo.height
  //   );
  // }

  // isColliding(mo) {
  //   return (
  //     this.x + this.width >= mo.x &&
  //     this.x <= mo.x + mo.width &&
  //     this.y + this.offsetY + this.height >= mo.y &&
  //     this.y + this.offsetY <= mo.y + mo.height
  //   );
  // }
}

// Bessere Formel zur Kollisionsberechnung (Genauer)
// isColliding (obj) {
//   return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
//           (this.Y + this.offsetY + this.height) >= obj.Y &&
//           (this.Y + this.offsetY) <= (obj.Y + obj.height) &&

// }

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
