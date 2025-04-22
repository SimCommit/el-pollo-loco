class Character extends MovableObject {
  x = 120;
  y = 230;
  heigth = 200;
  width = 100;

  constructor() {
    super().loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {}
}
