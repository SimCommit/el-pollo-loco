// world.class.js

class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new HealthBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  bossHealthBars = [];
  throwableObjects = [];
  endscreenObjects = [];
  onCooldown = false;
  spawnCooldown = false;
  bottleAmmo = 4;
  coinAmount = 0;
  readyToPlay = true;
  bossTrigger = false;
  introPlayed = false;
  BOSS_TRIGGER_RANGE = 500;
  INTRO_LENGTH = 2000;

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
      // if (paused) return;
      this.checkThrowObjects();
      this.checkCollisions();
      this.checkBossTrigger();
      this.checkEnemyDefeat();
      this.checkBossDefeat();
      this.checkCharacterDefeat();
      this.checkChonkSpawn();
    }, 1000 / 60);
  }

  checkChonkSpawn() {
    if (
      this.isCloseToCharacter(this.level.obstacles[2], 300) &&
      !this.spawnCooldown &&
      !this.areHelpersAlive()
    ) {
      let helperChonk = new Chonk(1650, 328, true);
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
        despawnObject(enemy, this.level.enemies, 2500);
      }
    });
  }

  checkBossTrigger() {
    if (
      !this.bossTrigger &&
      this.isCloseToCharacter(this.level.bosses[0], this.BOSS_TRIGGER_RANGE)
    ) {
      this.startBossEncounter();
    }
  }

  startBossEncounter() {
    this.level.bosses[0].animate();
    this.bossTrigger = true;
    playSound("assets/audio/music/boss_5.mp3", 1, 0.1, 0, true);
    document.querySelector(".game-menu").classList.add("d-none");
    setTimeout(() => {
      let endbossHealthBar = new EndbossHealthBar(this.level.bosses[0]);
      this.bossHealthBars.push(endbossHealthBar);
      this.introPlayed = true;
      document.querySelector(".game-menu").classList.remove("d-none");
    }, this.INTRO_LENGTH);
  }

  

  isCloseToCharacter(other, distance) {
    return Math.abs(other.x - this.character.x) < distance;
  }

  isPlayingIntro() {
    return this.bossTrigger && !this.introPlayed;
  }

  checkBossDefeat() {
    if (this.level.bosses[0].health <= 0) {
      despawnObject(this.bossHealthBars[0], this.bossHealthBars, 1000);
    }
  }

  checkCharacterDefeat() {
    if (this.character.health <= 0) {
      let lostScreen = new EndscreenObject(false);
      this.endscreenObjects.push(lostScreen);
      setTimeout(() => {
        quitGame();
      }, 3000);
    }
  }

  checkThrowObjects() {
    if (this.keyboard.D && !this.onCooldown && this.bottleAmmo > 0) {
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

  collisionEnemy(enemy) {
    if (this.character.isColliding(enemy)) {
      this.checkTopImpact(enemy);
      if (!this.character.isHigher(enemy) && !this.character.isInvincible()) {
        this.character.hit(20, this.character, -1);
        this.healthBar.setPercentage(this.character.health);
        // console.log("Character Health: ", this.character.health);
      }
      if (this.character.isHigher(enemy)) {
        enemy.hit(this.character.damage, enemy);
      }
    }
  }

  collisionThrowable(enemy) {
    for (let i = 0; i < this.throwableObjects.length; i++) {
      if (
        this.throwableObjects[i].isBroken === false &&
        this.throwableObjects[i].isColliding(enemy)
      ) {
        this.throwableObjects[i].isBroken = true;
        playSound("assets/audio/salsa_bottle/break_1.mp3", 1, 0.3, 200);
        enemy.hit(this.throwableObjects[i].damage, enemy);
        if (enemy instanceof Endboss) {
          this.bossHealthBars[0].setPercentage(this.level.bosses[0].health / 2);
        }
        // console.log("isBroken", this.throwableObjects[i].isBroken);
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
      if (item instanceof Coin && (this.coinAmount < 5 || this.character.health < 100)) {
        playSound("assets/audio/coin/collect_1.mp3", 1, 0.05, 200);
        despawnObject(item, this.level.collectibleObjects);
        if (this.coinAmount < 5) {
          this.coinAmount++;
          this.coinBar.setPercentage(this.coinAmount * 20);
        }
        if (this.character.health < 100) {
          this.character.health += 20;
          this.healthBar.setPercentage(this.character.health);
        }
      }
      if (item instanceof Bottle && this.bottleAmmo < 5) {
        playSound("assets/audio/salsa_bottle/collect_1.mp3", 1, 0.6, 200);
        despawnObject(item, this.level.collectibleObjects);
        this.bottleAmmo++;
        this.bottleBar.setPercentage(this.bottleAmmo * 20);
      }
    }
  }

  checkTopImpact(enemy) {
    if (this.character.isHigher(enemy) && this.character.isFalling()) {
      // this.character.invincibleTrigger = new Date().getTime() - 1000;
      if (enemy instanceof Chonk) {
        this.character.jump(20);
        playSound("assets/audio/character/bounce_2.mp3", 1, 0.3, 1000);
      } else {
        this.character.jump(14);
        playSound("assets/audio/character/bounce_1.mp3", 1, 0.3, 1000);
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
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.healthBar);
    this.addObjectsToMap(this.endscreenObjects);
    this.ctx.translate(this.camera_x, 0); // forwards

    this.ctx.translate(-this.camera_x, 0);

    // The function is repeatedly called via requestAnimationFrame (thanks to Michelle for this)
    requestAnimationFrame(() => {
      // if (paused) return;
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
