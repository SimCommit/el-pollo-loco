// endboss.class.js

class Endboss extends MovableObject {
  width = 300;
  height = 300;
  y = 145;

  offset = {
    top: 108,
    bottom: 48,
    left: 48,
    right: 48,
  };

  frameDelay = {
    dead: 7,
    alert: 9,
  };

  health = 200;

  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
  ];

  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
  ];

  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 1200;
    this.animate();
  }

  // animate() {
  //   setInterval(() => {
  //     this.playAnimation(this.IMAGES_ALERT);
  //   }, 200);
  // }

  animate() {
    setInterval(() => {
      this.updateState();

      switch (this.currentState) {
        case "dead":
          this.handleDead();
          break;
        case "hurt":
          this.handleHurt();
          break;
        case "alert":
          this.handleAlert();
          break;
        // case "attack":
        //   this.handleAttack();
        //   break;
        // case "walking":
        //   this.handleWalking();
        //   break;
      }
    }, 1000 / 30);
  }

  handleDead() {
    if (this.currentState === "dead") {
      if (this.currentImage < this.IMAGES_DEAD.length) {
        if (this.skipFrame % this.frameDelay.dead === 0) {
          this.playAnimation(this.IMAGES_DEAD);
        }
      } else {
        this.img = this.imageCache["assets/img/4_enemie_boss_chicken/5_dead/G26.png"];
        this.disableHitbox();
      }
      this.skipFrame += 1;
    }
  }

  handleHurt() {
    if (this.currentState === "hurt") {
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  handleAlert() {
    if (this.skipFrame % this.frameDelay.alert === 0) {
      this.playAnimation(this.IMAGES_ALERT);
    }
    this.skipFrame += 1;
    // console.log(this.currentState);
  }

  updateState() {
    let newState;

    if (this.isDead()) {
      newState = "dead";
    } else if (this.isHurt()) {
      newState = "hurt";
    } else {
      newState = "alert";
      // } else if (ATTACK) {
      //   newState = "attack";
      // } else {
      //   newState = "walking";
      // }
    }

    if (newState !== this.currentState) {
      this.resetCurrentImage();
      this.resetSkipFrame();
    }

    this.currentState = newState;
  }
}
