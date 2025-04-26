// status-bar.class.js

class StatusBar extends DrawableObject {
  IMAGES = [
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];
  x = 50;
  y = 10;
  width = 188;
  height = 50;
  // world;
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
  }

  // setPercentage(50)
  setPercentage(percentage) {
    this.percentage = percentage; // => 0... 5
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
    // this.x = this.x + this.world.camer;
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}

// setPercentage(percentage) {
//   this.percentage = percentage; // => 0... 5

//   if (this.percentage <= 0) {
//     return imageNumber = 0;
//   } else if (this.percentage > 0 && this.percentage < 40) {
//     return imageNumber = 1;
//   } else if (this.percentage > 20 && this.percentage < 60) {
//     return imageNumber = 2;
//   } else if (this.percentage > 40 && this.percentage < 80) {
//     return imageNumber = 3;
//   } else if (this.percentage > 60 && this.percentage < 100) {
//     return imageNumber = 4;
//   } else {
//     return imageNumber = 5;
//   }
// }

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
