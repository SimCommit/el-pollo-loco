// level.class.js

class Level {
  backgroundObjects = [];
  clouds = [];
  enemies;
  bosses = [];
  collectibleObjects = [];
  level_end_x = 2200;

  constructor(enemies, bosses, clouds, backgroundObjects, collectibleObjects){
    this.enemies = enemies;
    this.bosses = bosses;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectibleObjects = collectibleObjects;
  }
}
