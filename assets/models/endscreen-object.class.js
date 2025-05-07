// endscreen.class.js

class EndscreenObject extends DrawableObject {
    IMAGE_WON = "assets/img/You won, you lost/You Won B.png";
    IMAGE_LOST = "assets/img/You won, you lost/You lost b.png";
    IMAGE_GAME_OVER = "assets/img/You won, you lost/Game over A.png";

    width = 420;
    height = 300;
    x = 0;
    y = 0;

    constructor(won = false) {
        super();
        if (won) {
            this.loadImage(this.IMAGE_WON);
        } else {
            this.loadImage(this.IMAGE_LOST);
        }
    }
}