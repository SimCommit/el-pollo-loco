class Chicken extends MovableObject {
  width = 50;
  heigth = 50;

  constructor() {
    super().loadImage("../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 200 + Math.random() * 500;
    this.y = 375;
  }
}
