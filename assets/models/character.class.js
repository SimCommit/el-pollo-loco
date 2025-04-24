class Character extends MovableObject {
  x = 120;
  y = 230;
  heigth = 200;
  width = 100;
  IMAGES_WALKING = [
    "../assets/img/2_character_pepe/2_walk/W-21.png",
    "../assets/img/2_character_pepe/2_walk/W-22.png",
    "../assets/img/2_character_pepe/2_walk/W-23.png",
    "../assets/img/2_character_pepe/2_walk/W-24.png",
    "../assets/img/2_character_pepe/2_walk/W-25.png",
    "../assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  world;

  constructor() {
    super().loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {

    setInterval(() => {

      if (this.world.keyboard.RIGHT) {
        let i = this.currentImage % this.IMAGES_WALKING.length 
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }

    }, 100);


    // if (this.world.character.world.keyboard.LEFT) {
    //   this.moveLeft();
    // }

  }

  jump() {}
}
