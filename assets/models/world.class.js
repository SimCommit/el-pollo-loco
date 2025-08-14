// world.class.js

/**
 * @class World
 *
 * Represents the main game world, including all game entities, objects, and the rendering loop.
 * Manages game logic such as collision detection, object spawning, and camera movement.
 */
class World {
  /**
   * The main player character instance.
   * @type {Character}
   */
  character = new Character();

  /**
   * The current level configuration loaded into the world.
   * @type {Level}
   */
  level = level1;

  /**
   * Reference to the HTML canvas element used for rendering.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * 2D rendering context for the canvas, used to draw all visual elements.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * Tracks the state of keyboard inputs for controlling the game.
   * @type {Keyboard}
   */
  keyboard;

  /**
   * Horizontal camera offset in pixels.
   * Affects how the world is rendered relative to the viewport.
   * @type {number}
   */
  cameraX = 0;

  /**
   * Indicates whether throwing bottles is currently on cooldown.
   * Prevents immediate consecutive throws.
   * @type {boolean}
   */
  bottleOnCooldown = false;

  /**
   * Indicates whether enemy or object spawning is currently on cooldown.
   * @type {boolean}
   */
  spawnOnCooldown = false;

  /**
   * Current number of bottles (ammunition) available to the player.
   * @type {number}
   */
  bottleAmmo = 4;

  /**
   * Current number of coins the player is holding.
   * This value increases with each collected coin and resets when coins are converted into health
   * after the player has taken damage.
   * @type {number}
   */
  coinAmount = 0;

  /**
   * Flag indicating whether the game is in a state where the player can start playing.
   * @type {boolean}
   */
  readyToPlay = true;

  /**
   * Flag indicating whether the boss fight has been triggered.
   * @type {boolean}
   */
  bossTriggered = false;

  /**
   * Flag indicating whether the endscreen sequence has been triggered.
   * @type {boolean}
   */
  endscreenTriggered = false;

  /**
   * Flag indicating whether the intro sequence has been played.
   * @type {boolean}
   */
  introPlayed = false;

  /**
   * UI health bar representing the player's current health.
   * @type {HealthBar}
   */
  healthBar = new HealthBar(this.character.health);

  /**
   * UI element showing the player's coin progress towards earning back health.
   * The bar is filled based on {@link World#coinAmount}.
   * @type {CoinBar}
   */
  coinBar = new CoinBar(0);

  /**
   * UI element showing the player's current bottle ammunition.
   * Each bottle represents 20% of the bar.
   * @type {BottleBar}
   */
  bottleBar = new BottleBar(this.bottleAmmo * 20);

  /**
   * Collection of status bars that are always displayed in the UI.
   * Typically includes the health bar, coin bar, and bottle bar.
   * @type {(HealthBar|CoinBar|BottleBar)[]}
   */
  statusBars = [this.healthBar, this.coinBar, this.bottleBar];

  /**
   * Collection of health bars for bosses, shown during boss fights.
   * Empty if no boss is active.
   * @type {BossHealthBar[]}
   */
  bossHealthBars = [];

  /**
   * All throwable objects currently active in the world, such as bottles in flight.
   * @type {ThrowableObject[]}
   */
  throwableObjects = [];

  /**
   * All objects displayed on the endscreen after the game ends.
   * @type {DrawableObject[]}
   */
  endscreenObjects = [];

  /**
   * Horizontal range (in pixels) from the player at which the boss encounter is triggered.
   * @type {number}
   */
  BOSS_TRIGGER_RANGE = 700;

  /**
   * Duration of the intro sequence in milliseconds before gameplay resumes.
   * @type {number}
   */
  INTRO_LENGTH = 4000;

  /**
   * Creates a new game world instance and initializes rendering, entities, and game loop.
   *
   * @param {HTMLCanvasElement} canvas - The HTML canvas element used for rendering the game.
   * @param {Keyboard} keyboard - The keyboard input handler for player controls.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  /**
   * Links the world instance to its main entities, such as the player character and boss.
   * This allows these entities to access world data and interact with other objects.
   */
  setWorld() {
    this.character.setWorld(this);
    this.level.bosses[0].setWorld(this);
  }

  /**
   * Starts the main game loop, executed at 60 FPS, handling core game logic updates.
   * Includes object throwing, collision detection, event triggers, and spawning.
   */
  run() {
    setStoppableInterval(() => {
      this.checkThrowObjects();
      this.checkCollisions();
      this.checkBossTrigger();
      this.checkEnemyDefeat();
      this.checkBossDefeat();
      this.checkCharacterDefeat();
      this.checkChonkSpawn();
      this.checkChickenSoundTrigger();
    }, 1000 / 60);
  }

  /**
   * Reverses the horizontal movement direction of a given object by inverting its speed.
   *
   * @param {MovableObject} object - The object whose speed should be reversed.
   */
  reverseSpeed(object) {
    object.speed = object.speed * -1;
  }

  /**
   * Toggles the sprite's facing direction flag for rendering.
   * Switches {@link MovableObject#otherDirection} between `true` and `false`.
   *
   * @param {MovableObject} object - The object whose sprite direction should be toggled.
   */
  toggleSpriteDirection(object) {
    if (!object.otherDirection) {
      object.otherDirection = true;
    } else if (object.otherDirection) {
      object.otherDirection = false;
    }
  }

  /**
   * Renders all visual elements of the world onto the canvas.
   * Clears the canvas, applies camera translations, draws background and movable objects,
   * then renders fixed UI elements and schedules the next frame via `requestAnimationFrame`.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);
    // --- Space for background objects ---
    this.addObjectsToMap(this.level.backgroundObjects);

    // --- Space for movable objects ---
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.obstacles);
    this.addObjectsToMap(this.level.collectibleObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bosses);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.bossHealthBars);

    // back
    this.ctx.translate(-this.cameraX, 0);

    // --- Space for fixed objects ---
    this.addObjectsToMap(this.statusBars);
    this.addObjectsToMap(this.endscreenObjects);

    // forwards
    this.ctx.translate(this.cameraX, 0);
    this.ctx.translate(-this.cameraX, 0);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * Draws all given drawable objects onto the canvas.
   *
   * @param {DrawableObject[]} objects - An array of drawable objects to render.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single movable object to the canvas.
   * If the object faces the opposite direction, it is flipped before rendering
   * and flipped back afterward. Also contains a commented-out call to
   * {@link MovableObject#drawFrame} for debugging hitboxes.
   *
   * @param {MovableObject} mo - The movable object to render.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the drawing of an object horizontally on the canvas.
   * This is done by translating the context by the object's width (to prevent the object
   * from appearing to "teleport" when flipped) and scaling horizontally by `-1`,
   * then inverting its x-position.
   *
   * @param {MovableObject} mo - The movable object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores an object's original horizontal orientation after drawing.
   * Reverses both the x-position inversion and the canvas context transformation
   * applied in {@link World#flipImage}, ensuring the object is rendered correctly
   * for subsequent frames.
   *
   * @param {MovableObject} mo - The movable object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
