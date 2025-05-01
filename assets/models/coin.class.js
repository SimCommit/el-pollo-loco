// coin.class.js

class Coin extends CollectibleObject {
  IMAGES_COIN = ["assets/img/8_coin/coin_1.png", "assets/img/8_coin/coin_2.png"];

  offset = {
    top: 8,
    bottom: 8,
    left: 8,
    right: 8,
  };

  width = 70;
  height = 70;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);
    this.animate();
  }

  animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES_COIN);
      }, 1000 / 7);
    }
}
