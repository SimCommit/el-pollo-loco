// endscreen.class.js

class UiObject extends DrawableObject {
  IMAGE_WON = "assets/img/You won, you lost/You Won B.png";
  IMAGE_LOST = "assets/img/You won, you lost/You lost b.png";
  IMAGE_GAME_OVER = "assets/img/9_intro_outro_screens/game_over/game over!.png";

  constructor(x, y, width, height, won = false) {
    super();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.won = won;
    if (won) {
      this.loadImage(this.IMAGE_WON);
    } else {
      this.loadImage(this.IMAGE_GAME_OVER);
    }
  }
}
