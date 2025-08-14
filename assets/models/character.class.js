// character.class.js

/**
 * @class Character
 * The main character of the game (Pepe).
 * Contains all image arrays for different animation states.
 * Extends the MovableObject class.
 */
class Character extends MovableObject {
  /**
   * Image sequence for death animation.
   *
   * @type {string[]}
   */
  IMAGES_DYING = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Image sequence for hurt animation.
   *
   * @type {string[]}
   */
  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Image sequence for jumping animation.
   *
   * @type {string[]}
   */
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

  /**
   * Image sequence for walking animation.
   *
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Image sequence for extended idle (long idle) animation.
   *
   * @type {string[]}
   */
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

  /**
   * Image sequence for normal idle animation.
   *
   * @type {string[]}
   */
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

  /**
   * Defines the collision hitbox offset for the character.
   * Useful for adjusting the bounding box relative to the image size.
   *
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 104,
    bottom: 24,
    left: 28,
    right: 28,
  };

  /**
   * Frame delay settings for various animation states.
   * Higher values result in slower animations for that state.
   *
   * @type {{ dead: number, jumping: number, longIdle: number, idle: number }}
   */
  frameDelay = {
    dead: 5,
    jumping: 6,
    longIdle: 12,
    idle: 10,
  };

  /**
   * The horizontal position of the character.
   *
   * @type {number}
   */
  x = 110;


  /**
   * The current vertical position of the character.
   *
   * @type {number}
   */
  y = 220;

  /**
   * Vertical position from the previous frame.
   * Used for vertical movement smoothing or animation syncing.
   *
   * @type {number}
   */
  lastY = 220;

  /**
   * Vertical position from two frames ago.
   * Supports smoother vertical transitions.
   *
   * @type {number}
   */
  lastY2 = 220;

  /**
   * Vertical position from three frames ago.
   * Used for motion tracking across multiple frames.
   *
   * @type {number}
   */
  lastY3 = 220;

  /**
   * The width of the character in pixels.
   *
   * @type {number}
   */
  width = 100;

  /**
   * The height of the character in pixels.
   *
   * @type {number}
   */
  height = 200;

  /**
   * Horizontal movement speed of the character.
   *
   * @type {number}
   */
  speed = 8;

  /**
   * Vertical movement speed (positive = falling, negative = jumping).
   *
   * @type {number}
   */
  speedY = 0;

  /**
   * Vertical acceleration applied to the character (simulates gravity).
   *
   * @type {number}
   */
  acceleration = 1;

  /**
   * The current health of the character (0–100).
   *
   * @type {number}
   */
  health = 100;

  /**
   * The amount of damage the character can deal to enemies.
   *
   * @type {number}
   */
  damage = 50;

  /**
   * Reference to the game world the character is part of.
   * Set when the character is added to a World instance.
   *
   * @type {World}
   */
  world;

  /**
   * Creates a new Character instance and initializes its animation states.
   * Loads all relevant image sequences, applies gravity and movement,
   * and sets the initial state to "idle".
   */
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
    this.animate();
  }

  /**
   * Assigns the world instance to the character.
   * Required for interactions with the game environment (e.g. camera, state logic).
   *
   * @param {World} world - The world object the character belongs to.
   */
  setWorld(world) {
    this.world = world;
  }
}
