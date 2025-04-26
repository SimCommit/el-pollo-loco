// status-bar.class.js

class StatusBar extends DrawableObject {
  x = 50;
  y = 10;
  width = 188;
  height = 50;
  world;

  constructor() {
    super().loadImage("../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png");
  }

//   setWorld(world) {
//     this.world = world;
//   }

//   draw(ctx) {
//     ctx.drawImage(
//       this.img,
//       -this.world.camera_x + this.x,  // Korrektur im DRAW, nicht im constructor
//       this.y,
//       this.width,
//       this.height
//     );
//   }
}
