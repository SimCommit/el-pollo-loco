// character.class.js

class Character extends MovableObject {
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    // "assets/img/2_character_pepe/3_jump/J-31.png",
    // "assets/img/2_character_pepe/3_jump/J-32.png",
    // "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    // "assets/img/2_character_pepe/3_jump/J-38.png",
    // "assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DYING = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  offset = {
    top: 104,
    bottom: 24,
    left: 28,
    right: 28,
  };

  frameDelay = {
    dead: 5,
    jumping: 6,
    longIdle: 12,
    idle: 10,
  };

  x = 120;
  y = 220;
  lastY3 = 220;
  lastY2 = 220;
  lastY = 220;
  // lastX = 120;
  // lastX2 = 120;
  speed = 8;
  height = 200;
  width = 100;
  world;
  speedY = 0;
  acceleration = 1;
  health = 100;
  damage = 50;

  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DYING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.applyHorizontalForce();
    this.currentState = "idle";
    // this.invincibleTrigger = new Date().getTime();

    this.animate();
  }

  setWorld(world) {
    this.world = world;
  }

  animate() {
    setStoppableInterval(() => {
      // if (paused) return;
      this.updateState();
      this.world.camera_x = -this.x + 100;

      switch (this.currentState) {
        case "dead":
          this.handleDead();
          break;
        case "frozen":
          this.handleFrozen();
          console.log(this.currentState);
          break;
        case "hurt":
          this.handleHurt();
          break;
        case "walking":
          this.handleWalking();
          break;
        case "jumping":
          this.handleJumping();
          break;
        case "long_idle":
          this.handleLongIdle();
          break;
        case "idle":
          this.handleIdle();
          break;
      }

      this.lastY3 = this.lastY2;
      this.lastY2 = this.lastY;
      this.lastY = this.y;
      // this.lastX2 = this.lastX
      // this.lastX = this.x;
    }, 1000 / 30);
  }

  handleDead() {
    if (this.currentState === "dead") {
      if (this.currentImage < this.IMAGES_DYING.length) {
        SoundManager.playOne(SoundManager.CHARACTER_DEAD, 1, 0.3, 2000)
        if (this.skipFrame % this.frameDelay.dead === 0) {
          this.playAnimation(this.IMAGES_DYING);
        }
      } else {
        this.img = this.imageCache["assets/img/2_character_pepe/5_dead/D-57.png"];
      }
      this.skipFrame += 1;
    }
  }

  handleFrozen() {
    if (this.currentState === "frozen") {
      if (this.skipFrame % this.frameDelay.idle === 0) {
        this.playAnimation(this.IMAGES_IDLE);
      }

      this.skipFrame += 1;
    }
  }

  handleHurt() {
    if (this.currentState === "hurt") {
      this.playAnimation(this.IMAGES_HURT);
      SoundManager.playOne(SoundManager.CHARACTER_HURT, 1, 0.4, 1500);
    }
  }

  isblockedRight() {
    return this.world.level.obstacles.some((obstacle) => this.isTouchingFromLeft(obstacle));
  }

  isblockedLeft() {
    return this.world.level.obstacles.some((obstacle) => this.isTouchingFromRight(obstacle));
  }

  isOnTop() {
    return this.world.level.obstacles.some((obstacle) => this.isTouchingFromTop(obstacle));
  }

  handleWalking() {
    if (this.currentState === "walking") {
      this.playAnimation(this.IMAGES_WALKING);
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        !this.isblockedRight()
      ) {
        this.otherDirection = false;
        this.moveRight();
      }

      if (this.world.keyboard.LEFT && this.x > -200 && !this.isblockedLeft()) {
        this.otherDirection = true;
        this.moveLeft();
      }

      if (this.world.keyboard.SPACE) {
        this.jump();
      }

      if (
        (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) ||
        (this.world.keyboard.LEFT && this.x > -100)
      ) {
        SoundManager.playOne(SoundManager.CHARACTER_WALK, 4, 0.3, 160, false, 0);
      }
    }
  }

  handleJumping() {
    if (this.currentState === "jumping") {
      if (this.skipFrame % this.frameDelay.jumping === 0) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        !this.isblockedRight()
      ) {
        this.moveRight();
      }

      if (this.world.keyboard.LEFT && this.x > -200 && !this.isblockedLeft()) {
        this.moveLeft();
      }
      this.skipFrame += 1;
    }
  }

  handleLongIdle() {
    if (this.currentState === "long_idle") {
      if (this.skipFrame % this.frameDelay.longIdle === 0) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        SoundManager.playOne(SoundManager.CHARACTER_LONG_IDLE , 1, 0.3, 3700)
      }

      if (this.world.keyboard.SPACE) {
        this.jump();
      }

      this.skipFrame += 1;
    }
  }

  handleIdle() {
    if (this.currentState === "idle") {
      if (this.skipFrame % this.frameDelay.idle === 0) {
        this.playAnimation(this.IMAGES_IDLE);
      }

      if (this.world.keyboard.SPACE) {
        this.jump();
      }

      this.skipFrame += 1;
    }
  }

  updateState() {
    let newState;

    if (this.isDead()) {
      newState = "dead";
    } else if (this.world.isPlayingIntro()) {
      newState = "frozen";
    } else if (this.isHurt()) {
      newState = "hurt";
    } else if (this.isAboveGround()) {
      newState = "jumping";
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      newState = "walking";
    } else if (this.isLongIdle() && !this.world.bossTriggered) {      
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
}
