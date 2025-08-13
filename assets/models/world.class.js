// world.class.js

class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  bottleOnCooldown = false;
  spawnOnCooldown = false;
  bottleAmmo = 4;
  coinAmount = 0;
  readyToPlay = true;
  bossTriggered = false;
  endscreenTriggered = false;
  introPlayed = false;
  healthBar = new HealthBar(this.character.health);
  coinBar = new CoinBar(0);
  bottleBar = new BottleBar(this.bottleAmmo * 20);
  statusBars = [this.healthBar, this.coinBar, this.bottleBar];
  bossHealthBars = [];
  throwableObjects = [];
  endscreenObjects = [];
  BOSS_TRIGGER_RANGE = 700;
  INTRO_LENGTH = 4000;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // ???
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.setWorld(this);
    this.level.bosses[0].setWorld(this);
  }

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

  reverseSpeed(object) {
    object.speed = object.speed * -1;
  }

  toggleSpriteDirection(object) {
    if (!object.otherDirection) {
      object.otherDirection = true;
    } else if (object.otherDirection) {
      object.otherDirection = false;
    }
  }

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

    this.ctx.translate(-this.cameraX, 0); // back

    // --- Space for fixed objects ---
    this.addObjectsToMap(this.statusBars);
    this.addObjectsToMap(this.endscreenObjects);

    this.ctx.translate(this.cameraX, 0); // forwards

    this.ctx.translate(-this.cameraX, 0);

    // The function is repeatedly called via requestAnimationFrame (thanks to Michelle for this)
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  // mo = movable object
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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0); //  shift by object width to prevent "teleporting" when flipping (otherDirection)
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
