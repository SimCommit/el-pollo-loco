// level.class.js

class Level {
  backgroundObjects = [];
  clouds = [];
  enemies;
  collectibleObjects = [];
  level_end_x = 2200;

  constructor(enemies, clouds, backgroundObjects, collectibleObjects){
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectibleObjects = collectibleObjects;
  }
}
