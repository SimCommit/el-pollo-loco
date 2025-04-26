// character.class.js

class Character extends MovableObject {
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

  IMAGES_DYING = [
    "../assets/img/2_character_pepe/5_dead/D-51.png",
    "../assets/img/2_character_pepe/5_dead/D-52.png",
    "../assets/img/2_character_pepe/5_dead/D-53.png",
    "../assets/img/2_character_pepe/5_dead/D-54.png",
    "../assets/img/2_character_pepe/5_dead/D-55.png",
    "../assets/img/2_character_pepe/5_dead/D-56.png",
    "../assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  walking_sound = new Audio("../assets/audio/character/walk2.mp3");
  x = 120;
  y = 220;
  speed = 6;
  height = 200;
  width = 100;
  world;
  speedY = 0;
  acceleration = 1;
  offset = {
    top: 80,
    bottom: 8,
    left: 18,
    right: 18,
  };

  constructor() {
    super().loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DYING);
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

      if(this.isDead()) {
        this.playAnimation(this.IMAGES_DYING)
      } else if (this.isAboveGround()) {
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
