// level.class.js

/**
 * @class Level
 *
 * Represents a game level containing all environment elements, enemies, collectibles and layout data.
 * Used by the World class to structure and render the current game state.
 */
class Level {
  /**
   * All static background layers (e.g. hills, sky, trees).
   * Rendered in parallax and not interactive.
   * @type {BackgroundObject[]}
   */
  backgroundObjects = [];

  /**
   * Cloud objects that move independently across the level.
   * Used for visual depth (parallax effect).
   * @type {Cloud[]}
   */
  clouds = [];

  /**
   * Standard enemies (e.g. chickens, chonks).
   * Used for interactions and collisions with the player.
   * @type {MovableObject[]}
   */
  enemies;

  /**
   * Endboss instances (typically one per level).
   * Special enemies with more health and unique behavior.
   * @type {MovableObject[]}
   */
  bosses = [];

  /**
   * Static obstacles like spikes or cliffs that block or damage the player.
   * @type {Obstacle[]}
   */
  obstacles = [];

  /**
   * All items that can be collected by the player (e.g. coins, bottles).
   * @type {CollectibleObject[]}
   */
  collectibleObjects = [];

  /**
   * X-coordinate where the level ends and the win condition is triggered.
   * @type {number}
   */
  level_end_x = 4250;

  /**
   * Creates a new Level instance with the specified content.
   *
   * @param {MovableObject[]} enemies - All regular enemies in the level.
   * @param {MovableObject[]} bosses - Endbosses to fight at the end of the level.
   * @param {Cloud[]} clouds - Clouds to animate in the background.
   * @param {BackgroundObject[]} backgroundObjects - Non-interactive background visuals.
   * @param {CollectibleObject[]} collectibleObjects - Items the player can pick up.
   * @param {Obstacle[]} obstacles - Static objects that block or hurt the player.
   */
  constructor(enemies, bosses, clouds, backgroundObjects, collectibleObjects, obstacles) {
    this.enemies = enemies;
    this.bosses = bosses;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectibleObjects = collectibleObjects;
    this.obstacles = obstacles;
  }
}
