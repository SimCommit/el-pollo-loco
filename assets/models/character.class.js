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

  IMAGES_HURT = [
    "../assets/img/2_character_pepe/4_hurt/H-41.png",
    "../assets/img/2_character_pepe/4_hurt/H-42.png",
    "../assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "../assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "../assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  offset = {
    top: 80,
    bottom: 8,
    left: 18,
    right: 18,
  };

  walking_sound = new Audio("../assets/audio/character/walk2.mp3");
  x = 120;
  y = 220;
  speed = 6;
  height = 200;
  width = 100;
  world;
  speedY = 0;
  acceleration = 1;
  health = 100;
  longIdleThreshold = 5;
  skipFrame = 0;
  frameDelayDead = 5;
  frameDelayIdle = 10;

  constructor() {
    super().loadImage("../assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DYING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.updateState();
      this.world.camera_x = -this.x + 100;

      if (this.currentState === "dead") {
        if (this.currentImage < this.IMAGES_DYING.length) {
          if (this.skipFrame % this.frameDelayDead === 0) {
            this.playAnimation(this.IMAGES_DYING);
          }
        } else {
          this.img = this.imageCache["../assets/img/2_character_pepe/5_dead/D-57.png"];
        }
        this.skipFrame += 1;
      }

      if (this.currentState === "hurt") {
        this.playAnimation(this.IMAGES_HURT);
        // this.rebound();
      }

      if (this.currentState === "walking") {
        this.playAnimation(this.IMAGES_WALKING);
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
          this.otherDirection = false;
          this.moveRight();
        }
        console.log(this.currentState);

        if (this.world.keyboard.LEFT && this.x > -100) {
          this.otherDirection = true;
          this.moveLeft();
        }

        if (
          (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) ||
          (this.world.keyboard.LEFT && this.x > -100)
        ) {
          this.walking_sound.playbackRate = 4;
          this.walking_sound.volume = 0.3;
          this.walking_sound.play();
        }
      }

      

      if (this.currentState === "idle") {
        if (this.skipFrame % this.frameDelayIdle === 0) {
          this.playAnimation(this.IMAGES_IDLE);
        }
        this.skipFrame += 1;
      }
    }, 1000 / 20);

    // setInterval(() => {

    //   if (this.y >= 220 && (this.world.keyboard.UP || this.world.keyboard.SPACE)) {
    //     this.jump();
    //   }

    //   this.world.camera_x = -this.x + 100;
    // }, 1000 / 60);

    // setInterval(() => {
    //   if (this.isDead()) {
    //     this.playAnimation(this.IMAGES_DYING);
    //   } else if (this.isHurt()) {
    //     this.playAnimation(this.IMAGES_HURT);
    //   } else if (this.isAboveGround()) {
    //     this.playAnimation(this.IMAGES_JUMPING);
    //   } else {
    //     // Walk animation
    //   }
    // }, 1000 / 20);
  }

  updateState() {
    let newState;
    if (this.isDead()) {
      newState = "dead";
    } else if (this.isHurt()) {
      newState = "hurt";
    } else if (this.isAboveGround()) {
      newState = "jumping";
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      newState = "walking";
    } else if (this.isLongIdle()) {
      newState = "long_idle";
    } else {
      newState = "idle";
    }
    if (newState !== this.currentState) {
      this.resetCurrentImage();
      this.resetSkipFrame();
    }
    this.currentState = newState;
  }

  resetCurrentImage() {
    return (this.currentImage = 0);
  }

  resetSkipFrame() {
    return (this.skipFrame = 0);
  }

  isLongIdle() {
    let timePassed = new Date().getTime() - lastInput; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed > this.longIdleThreshold;
  }
}
