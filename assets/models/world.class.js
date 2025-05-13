// world.class.js

class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  onCooldown = false;
  spawnCooldown = false;
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
    this.draw();
    this.setWorld();
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

  checkChonkSpawn() {
    if (
      this.isCloseToCharacter(this.level.obstacles[2], 300) &&
      !this.spawnCooldown &&
      !this.areHelpersAlive()
    ) {
      let helperChonk = new Chonk(2500, 328, true);
      this.level.enemies.push(helperChonk);
      this.spawnCooldown = true;
      setTimeout(() => {
        this.spawnCooldown = false;
      }, 2000);
    }
  }

  areHelpersAlive() {
    return this.level.enemies.some((enemy) => enemy.isHelper);
  }

  checkEnemyDefeat() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.health <= 0 && !enemy.isMarkedForDespawn) {
        enemy.isMarkedForDespawn = true;
        despawnObject(enemy, this.level.enemies, 2000);
      }
    });
  }

  checkBossTrigger() {
    if (
      !this.bossTriggered &&
      this.isCloseToCharacter(this.level.bosses[0], this.BOSS_TRIGGER_RANGE)
    ) {
      this.startBossEncounter();
    }
  }

  checkChickenSoundTrigger() {
    this.level.enemies.forEach((enemy) => {
      if (this.isCloseToCharacter(enemy, 200)) {
        SoundManager.playOne(SoundManager.CHICKEN_NOISE, 1, 0.2, 5000);
      }
    });
  }

  startBossEncounter() {
    this.level.bosses[0].animate();
    this.bossTriggered = true;
    hideGameMenuButtons();
    SoundManager.stopOne(SoundManager.MUSIC_BACKGROUND);
    SoundManager.playOne(SoundManager.MUSIC_BOSS_INTRO);
    setTimeout(() => {
      SoundManager.playOne(SoundManager.BOSS_INTRO, 1, 0.3);
    }, 1500);
    setTimeout(() => {
      SoundManager.playOne(SoundManager.MUSIC_BOSS_FIGHT, 1, 0.2, 0, true);
      let endbossHealthBar = new EndbossHealthBar(this.level.bosses[0]);
      this.bossHealthBars.push(endbossHealthBar);
      this.introPlayed = true;
      showGameMenuButtons();
    }, this.INTRO_LENGTH);
  }

  isCloseToCharacter(other, distance) {
    // return other.x - this.character.x < distance;
    return Math.abs(other.x - this.character.x) < distance;
  }

  isPlayingIntro() {
    return this.bossTriggered && !this.introPlayed;
  }

  checkBossDefeat() {
    if (this.level.bosses[0].health <= 0 && !this.endscreenTriggered) {
      this.endscreenTriggered = true;
      this.bossHealthBars = [];
      setTimeout(() => {
        SoundManager.stopAll();
        // this.character.jump(9);
      }, 3400);
      setTimeout(() => {
        this.showEndscreen(true);
        stopAllIntervals();
      }, 4000);
    }
  }

  checkCharacterDefeat() {
    if (this.character.health <= 0 && !this.endscreenTriggered) {
      this.endscreenTriggered = true;
      setTimeout(() => {
        this.showEndscreen(false);
        stopAllIntervals();
      }, 2000);
    }
  }

  showEndscreen(won = false) {
    if (won) {
      let wonScreen = new UiObject(156, 190, 400, 90, true);
      this.endscreenObjects.push(wonScreen);
      SoundManager.playOne(SoundManager.MUSIC_GAME_WON, 1, 0.15, 0);
    } else {
      let lostScreen = new UiObject(0, 0, 720, 480, false);
      this.endscreenObjects.push(lostScreen);
      SoundManager.stopAll();
      SoundManager.playOne(SoundManager.MUSIC_GAME_OVER, 1, 0.15, 0);
    }
    this.statusBars = [];
    hideGameMenuButtons();
    hideControlButtons();
    showEndscreenButtons();
  }

  checkThrowObjects() {
    if (
      this.keyboard.D &&
      !this.onCooldown &&
      this.bottleAmmo > 0 &&
      this.character.currentState != "frozen"
    ) {
      this.onCooldown = true;
      this.bottleAmmo--;
      let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 70);
      this.throwableObjects.push(bottle);
      this.bottleBar.setPercentage(this.bottleAmmo * 20);
      setTimeout(() => {
        this.onCooldown = false;
      }, 500);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.collisionEnemy(enemy);
      this.collisionThrowable(enemy);
      this.collisionObstacle(enemy);
      this.collisionEnemyWithEnemy(enemy);
    });

    this.level.bosses.forEach((boss) => {
      this.collisionEnemy(boss);
      this.collisionThrowable(boss);
    });

    this.level.collectibleObjects.forEach((item) => {
      this.collisionCollectible(item);
    });
    this.level.obstacles.forEach((obstacle) => {
      this.collisionCharacterWithObstacle(obstacle);
    });
  }

  collisionEnemy(enemy) {
    if (this.character.isColliding(enemy) && !this.endscreenTriggered) {
      this.checkTopImpact(enemy);

      if (enemy instanceof Endboss && !this.character.isInvincible()) {
        this.character.hit(20, this.character, "left");
      }

      if (!this.character.isHigher(enemy) && !this.character.isInvincible()) {
        this.character.hit(20, this.character, -1);
        this.healthBar.setPercentage(this.character.health);
      }
      if (this.character.isHigher(enemy)) {
        enemy.hit(this.character.damage, enemy);
      }
    }
  }

  collisionEnemyWithEnemy(enemy) {
    this.level.enemies.forEach((e) => {
      if (e.isColliding(enemy) && e != enemy) {
        this.toggleSpriteDirection(enemy);
        this.reverseSpeed(enemy);
      }
    });
  }

  collisionCharacterWithObstacle(obstacle) {
    if (this.character.isTouchingFromLeft(obstacle) && !this.character.isInvincible()) {
      this.character.hit(20, this.character, "left");
    } else if (this.character.isTouchingFromRight(obstacle) && !this.character.isInvincible()) {
      this.character.hit(20, this.character, "right");
    } else if (this.character.isTouchingFromTop(obstacle) && !this.character.isInvincible()) {
      this.character.hit(20, this.character, "up-left");
    }
    this.healthBar.setPercentage(this.character.health);
  }

  collisionObstacle(enemy) {
    this.level.obstacles.forEach((obstacle) => {
      if (obstacle.isColliding(enemy)) {
        this.toggleSpriteDirection(enemy);
        this.reverseSpeed(enemy);
      }
    });
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

  collisionThrowable(enemy) {
    for (let i = 0; i < this.throwableObjects.length; i++) {
      if (
        this.throwableObjects[i].isBroken === false &&
        this.throwableObjects[i].isColliding(enemy)
      ) {
        this.throwableObjects[i].isBroken = true;
        SoundManager.playOne(SoundManager.BOTTLE_BREAK, 1, 0.3, 200);
        enemy.hit(this.throwableObjects[i].damage, enemy);
        if (enemy instanceof Endboss) {
          this.bossHealthBars[0].setPercentage(this.level.bosses[0].health / 2);
        }
        despawnObject(this.throwableObjects[i], this.throwableObjects, 600);
        this.killMomentum(this.throwableObjects[i]);
      }
      if (this.throwableObjects[i].isBroken === false && this.throwableObjects[i].y > 480) {
        this.throwableObjects[i].isBroken = true;
        despawnObject(this.throwableObjects[i], this.throwableObjects);
      }
    }
  }

  collisionCollectible(item) {
    if (this.character.isColliding(item)) {
      if (item instanceof Coin && (this.coinAmount < 50 || this.character.health < 100)) {
        SoundManager.playOne(SoundManager.COIN_COLLECT, 1, 0.05, 200);
        despawnObject(item, this.level.collectibleObjects);
        if (this.coinAmount < 50) {
          this.coinAmount++;
          this.coinBar.setPercentage(this.coinAmount * 2);
        }
        if (this.character.health < 100) {
          this.character.health += 20;
          this.healthBar.setPercentage(this.character.health);
        }
      }
      if (item instanceof Bottle && this.bottleAmmo < 5) {
        SoundManager.playOne(SoundManager.BOTTLE_COLLECT, 1, 0.6, 200);
        despawnObject(item, this.level.collectibleObjects);
        this.bottleAmmo++;
        this.bottleBar.setPercentage(this.bottleAmmo * 20);
      }
    }
  }

  checkTopImpact(enemy) {
    if (this.character.isHigher(enemy) && this.character.isFalling()) {
      if (enemy instanceof Chonk) {
        this.character.jump(20);
        SoundManager.playOne(SoundManager.CHARACTER_BOUNCE_HIGH, 1, 0.3, 1000);
      } else {
        this.character.jump(14);
        SoundManager.playOne(SoundManager.CHARACTER_BOUNCE_LOW, 1, 0.3, 1000);
      }
    }
  }

  killMomentum(o) {
    o.speedX = 0;
    o.speedY = 0;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
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

    this.ctx.translate(-this.camera_x, 0); // back

    // --- Space for fixed objects ---
    this.addObjectsToMap(this.statusBars);
    this.addObjectsToMap(this.endscreenObjects);

    this.ctx.translate(this.camera_x, 0); // forwards

    this.ctx.translate(-this.camera_x, 0);

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
