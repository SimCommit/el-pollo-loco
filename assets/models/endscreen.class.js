// endscreen.class.js

class Endscreen extends DrawableObject {
    IMAGE_WON = "assets/img/You won, you lost/You Won B.png";
    IMAGE_LOST = "assets/img/You won, you lost/You lost b.png";
    IMAGE_GAME_OVER = "assets/img/You won, you lost/Game over A.png";

    width = 720;
    height = 480;

    constructor(won = false) {
        // this.won = won;
        if (won) {
            this.loadImage(this.IMAGE_WON);
        } else {
            this.loadImage(this.IMAGE_LOST);
        }
    }
}