// endboss.class.js

/**
 * @class Endboss
 *
 * Represents the final boss enemy in the game.
 * Inherits movement and physics from MovableObject.
 */
class Endboss extends MovableObject {
  /**
   * Hitbox offset values to adjust collision detection.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 108,
    bottom: 68,
    left: 52,
    right: 52,
  };

  /**
   * Frame delays for each animation state of the boss.
   * @type {{ dead: number, hurt: number, alert: number, attack: number, walking: number, intro1: number }}
   */
  frameDelay = {
    dead: 7,
    hurt: 3,
    alert: 9,
    attack: 9,
    walking: 5,
    intro1: 10,
  };

  /**
   * Reference to the world object containing game entities.
   * @type {World}
   */
  world;

  /**
   * Vertical position of the boss.
   * @type {number}
   */
  y = 145;

  /**
   * Width of the boss sprite.
   * @type {number}
   */
  width = 300;

  /**
   * Height of the boss sprite.
   * @type {number}
   */
  height = 300;

  /**
   * Movement speed of the boss.
   * @type {number}
   */
  speed = 7;

  /**
   * Timestamp when the boss started attacking.
   * @type {number}
   */
  attackStart = 0;

  /**
   * Timestamp when the boss last changed direction.
   * @type {number}
   */
  switchDirectionStart = 0;

  /**
   * Random value used to influence boss behavior.
   * @type {number}
   */
  ran = 0;

  /**
   * Current health of the boss.
   * @type {number}
   */
  health = 250;

  /**
   * Amount of damage the boss deals.
   * @type {number}
   */
  damage = 50;

  /**
   * Image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * Image paths for the alert animation sequence.
   * @type {string[]}
   */
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

  /**
   * Image paths for the attack animation sequence.
   * Includes repeated frames for visual emphasis.
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * Image paths for the hurt animation sequence.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * Image paths for the death animation sequence.
   * Includes frames shared with the hurt animation and dedicated death frames.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Initializes the Endboss by loading all animation image sequences
   * and setting the initial horizontal position.
   *
   * - Loads walking, alert, attack, hurt, and dead animations
   * - Displays the first alert frame as default image
   * - Places the boss at x = 3800 (typically near the end of the level)
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    /**
     * Horizontal starting position of the boss in the level.
     * @type {number}
     */
    this.x = 3800;
  }

  /**
   * Assigns the current game world to the Endboss.
   *
   * @param {World} world - The world instance in which the Endboss exists.
   */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Starts the animation loop for the Endboss.
   * Updates the animation state and handles behavior based on the current state.
   *
   * Runs at a fixed interval of 30 FPS.
   */
  animate() {
    setStoppableInterval(() => {
      // if (paused) return;

      this.updateState();

      switch (this.currentState) {
        case "dead":
          this.handleDead();
          break;
        case "intro":
          this.handleIntro();
          break;
        case "hurt":
          this.handleHurt();
          break;
        case "attack":
          this.handleAttack();
          break;
        case "alert":
          this.handleAlert();
          break;
        case "walking":
          this.handleWalking();
          break;
      }
    }, 1000 / 30);
  }

  /**
   * Handles the Endboss behavior during the "dead" state.
   * Plays the death animation and triggers sound effects.
   * Once the animation is complete, the hitbox is disabled.
   */
  handleDead() {
    if (this.currentState === "dead") {
      if (this.currentImage < this.IMAGES_DEAD.length) {
        if (this.skipFrame % this.frameDelay.dead === 0) {
          this.playAnimation(this.IMAGES_DEAD);
          SoundManager.playOne(SoundManager.BOSS_HURT, 1, 0.3, 10000);
          SoundManager.playOne(SoundManager.BOSS_DEAD, 1, 0.4, 10000);
        }
      } else {
        this.img = this.imageCache["assets/img/4_enemie_boss_chicken/5_dead/G26.png"];
        this.disableHitbox();
      }
      this.skipFrame += 1;
    }
  }

  /**
   * Handles the Endboss behavior during the "dead" state.
   * Plays the death animation and triggers sound effects.
   * Once the animation is complete, the hitbox is disabled.
   */
  handleIntro() {
    let timePassed = this.secondsSince(this.introStart);

    if (timePassed < 1.8) {
      this.playStateAnimation(this.IMAGES_WALKING, this.frameDelay.intro1);
      this.moveLeft();
    }

    if (timePassed >= 1.8 && timePassed < 2.5) {
      this.playStateAnimation(this.IMAGES_ALERT, this.frameDelay.alert);
    }
  }

  /**
   * Handles the Endboss behavior during the "hurt" state.
   * Plays the hurt animation and triggers the corresponding sound effect.
   */
  handleHurt() {
    if (this.currentState === "hurt") {
      this.playStateAnimation(this.IMAGES_HURT, this.frameDelay.hurt);
      SoundManager.playOne(SoundManager.BOSS_HURT, 1, 0.3, 1000);
    }
  }

  /**
   * Handles the Endboss behavior during the "attack" state.
   *
   * - Plays the attack animation for the first 2.5 seconds
   * - Between second 1 and 2.5, the boss charges left and plays a sound
   * - After 2.5 seconds, the boss retreats to the right with walking animation
   */
  handleAttack() {
    let timePassed = this.secondsSince(this.attackStart);

    if (timePassed < 2.5) {
      this.playStateAnimation(this.IMAGES_ATTACK, this.frameDelay.attack);

      if (timePassed >= 1 && timePassed < 2.5) {
        this.speed = 6;
        SoundManager.playOne(SoundManager.BOSS_ATTACK, 1, 0.3, 2000);
        this.moveLeft();
      }
    } else {
      this.moveRight();
      this.playStateAnimation(this.IMAGES_WALKING, this.frameDelay.attack);
    }
  }

  /**
   * Handles the Endboss behavior during the "alert" state.
   * Plays the alert animation at the defined frame rate.
   */
  handleAlert() {
    this.playStateAnimation(this.IMAGES_ALERT, this.frameDelay.alert);
  }

  /**
   * Handles the Endboss behavior during the "walking" state.
   * Plays the walking animation and moves the boss left or right
   * based on a periodically refreshed random value.
   */
  handleWalking() {
    this.playStateAnimation(this.IMAGES_WALKING, this.frameDelay.walking);
    let timePassed = this.secondsSince(this.switchDirectionStart);

    if (timePassed > 2) {
      this.ran = Math.random();
      this.switchDirectionStart = new Date().getTime();
    }

    if (this.ran < 0.3 && this.x > 1500) {
      this.speed = 4;
      this.moveLeft();
    }

    if (this.ran > 0.3 && this.x < this.world.level.level_end_x) {
      this.speed = 2;
      this.moveRight();
    }
  }

  /**
   * Updates the current state of the Endboss based on behavior logic.
   * If the state has changed, resets animation tracking and sets relevant timestamps.
   */
  updateState() {
    let newState = this.resolveState();

    if (newState !== this.currentState) {
      this.resetCurrentImage();
      this.resetSkipFrame();
      this.attackStart = this.timestampIfState("attack", newState);
      this.introStart = this.timestampIfState("intro", newState);
    }

    this.currentState = newState;
  }

  /**
   * Determines the next logical state of the Endboss based on its condition and environment.
   *
   * @returns {string} The resolved state: "dead", "intro", "hurt", "attack", "walking", or "alert".
   */
  resolveState() {
    if (this.isDead()) {
      return "dead";
    } else if (this.world.isPlayingIntro()) {
      return "intro";
    } else if (this.isHurt()) {
      return "hurt";
    } else if (this.world.isCloseToCharacter(this, 300)) {
      return "attack";
    } else if (this.world.isCloseToCharacter(this, 40)) {
      return "walking";
    } else {
      return "alert";
    }
  }

  /**
   * Returns a new timestamp if the given state matches the new state.
   * Otherwise returns the previously stored timestamp for that state.
   *
   * @param {string} state - The state to compare against.
   * @param {string} newState - The currently evaluated new state.
   * @returns {number} A new timestamp (in ms) or the existing one for the given state.
   */
  timestampIfState(state, newState) {
    if (newState === state) {
      return new Date().getTime();
    } else {
      return this[state + "Start"];
    }
  }
}
