class Cloud extends MovableObject {
  heigth = 338;
  width = 600;

    constructor() {
        super().loadImage('../assets/img/5_background/layers/4_clouds/1.png');

        this.x = 10 + Math.random() * 200;
        this.y = 0;
      }
}