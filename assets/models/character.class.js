// character.class.js

class Character extends MovableObject {
  x = 120;
  y = 220;
  speed = 6;
  height = 200;
  width = 100;
  IMAGES_WALKING = [
    "../assets/img/2_character_pepe/2_walk/W-21.png",
    "../assets/img/2_character_pepe/2_walk/W-22.png",
    "../assets/img/2_character_pepe/2_walk/W-23.png",
    "../assets/img/2_character_pepe/2_walk/W-24.png",
    "../assets/img/2_character_pepe/2_walk/W-25.png",
    "../assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "../assets/img/2_character_pepe/3_jump/J-31.png",
    "../assets/img/2_character_pepe/3_jump/J-32.png",
    "../assets/img/2_character_pepe/3_jump/J-33.png",
    "../assets/img/2_character_pepe/3_jump/J-34.png",
    "../assets/img/2_character_pepe/3_jump/J-35.png",
    "../assets/img/2_character_pepe/3_jump/J-36.png",
    "../assets/img/2_character_pepe/3_jump/J-37.png",
    "../assets/img/2_character_pepe/3_jump/J-38.png",
    "../assets/img/2_character_pepe/3_jump/J-39.png",
  ];
  walking_sound = new Audio("../assets/audio/character/walk2.mp3");
  world;
  speedY = 0;
  acceleration = 1;
  offsetX = 12;
  offsetRight = 18;
  offsetY = 80;
  offsetBottom = 8;

  constructor() {
    super().loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
  }

  animate() {
    // Move character
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.otherDirection = false;
        this.moveRight();
        if (!this.isAboveGround()) {
          this.walking_sound.playbackRate = 4;
          this.walking_sound.volume = 0.5;
          this.walking_sound.play();
        }
      }

      if (this.world.keyboard.LEFT && this.x > -100) {
        this.otherDirection = true;
        this.moveLeft();
        if (!this.isAboveGround()) {
          this.walking_sound.playbackRate = 4;
          this.walking_sound.volume = 0.5;
          this.walking_sound.play();
        }
      }

      // console.log(this.speedY);

      if (this.y >= 220 && (this.world.keyboard.UP || this.world.keyboard.SPACE)) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    // Walk animation
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 50);

    // if (this.world.character.world.keyboard.LEFT) {
    //   this.moveLeft();
    // }
  }
}
