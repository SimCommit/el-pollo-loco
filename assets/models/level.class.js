// level.class.js

class Level {
  backgroundObjects = [];
  clouds = [];
  enemies;
  bosses = [];
  obstacles = [];
  collectibleObjects = [];
  level_end_x = 2100;

  constructor(enemies, bosses, clouds, backgroundObjects, collectibleObjects, obstacles){
    this.enemies = enemies;
    this.bosses = bosses;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectibleObjects = collectibleObjects;
    this.obstacles = obstacles;
  }
}
