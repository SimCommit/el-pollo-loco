// endscreen.class.js

class UiObject extends DrawableObject {
  IMAGE_WON = "assets/img/You won, you lost/You Won B.png";
  IMAGE_LOST = "assets/img/You won, you lost/You lost b.png";
  IMAGE_GAME_OVER = "assets/img/You won, you lost/Game over A.png";

  constructor(x, y, width, height, won = false) {
    super();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    if (won) {
      this.loadImage(this.IMAGE_WON);
    } else {
      this.loadImage(this.IMAGE_LOST);
    }
  }
}
