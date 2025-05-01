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
  throwableObjects = [];
  onCooldown = false;
  bottleAmmo = 4;
  readyToPlay = true;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // ???
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkThrowObjects();
      this.checkCollisions();
    }, 1000 / 120);
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
    });

    this.level.collectibleObjects.forEach((item) => {
      this.collisionCollectible(item);
    });
  }

  collisionEnemy(enemy) {
    if (this.character.isColliding(enemy)) {
      this.checkTopImpact(enemy);
      if (!this.character.isHigher(enemy) && !this.character.isInvincible()) {
        this.character.hit(20, this.character);
        this.healthBar.setPercentage(this.character.health);
        console.log("Character Health: ", this.character.health);
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
        console.log("isBroken", this.throwableObjects[i].isBroken);
        this.despawnThrowableObject(this.throwableObjects[i]);
        this.killMomentum(this.throwableObjects[i]);
      }
      if (this.throwableObjects[i].isBroken === false && this.throwableObjects[i].y > 480) {
        this.throwableObjects[i].isBroken = true;
        this.despawnThrowableObject(this.throwableObjects[i]);
      }
    }
  }

  collisionCollectible(item) {
    if (this.character.isColliding(item) && this.bottleAmmo < 5) {
      playSound("assets/audio/salsa_bottle/collect_1.mp3", 1, 0.6, 200)
      this.despawnCollectibleObject(item);
      this.bottleAmmo++;
      this.bottleBar.setPercentage(this.bottleAmmo * 20);
      console.log("Ammo: ", this.bottleAmmo);
    }
  }

  despawnCollectibleObject(item) {
    let index = this.level.collectibleObjects.indexOf(item);
    this.level.collectibleObjects.splice(index, 1);
  }

  checkTopImpact(enemy) {
    if (this.character.isHigher(enemy)) {
      this.character.invincibleTrigger = new Date().getTime();
      this.character.jump();
      playSound("assets/audio/character/bounce_1.mp3", 1, 0.3, 1000);
    }
  }

  // playSound(path, rate, volume, cooldown) {
  //   let sound = new Audio(path);
  //   sound.playbackRate = rate;
  //   sound.volume = volume;
  //   this.setCooldown(sound.play(), cooldown);
  // }

  // setCooldown(fn, cooldown){
  //   if (this.readyToPlay) {
  //     fn;
  //     this.readyToPlay = false;
  //   }
  //   setTimeout(() => {
  //     this.readyToPlay = true;
  //   }, cooldown);
  // }

  despawnThrowableObject(bottle) {
    setTimeout(() => {
      let index = this.throwableObjects.indexOf(bottle);
      this.throwableObjects.splice(index, 1);
      console.log("despawned");
    }, 600);
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
    this.addObjectsToMap(this.level.collectibleObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0); // back
    // --- Space for fixed objects ---
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.healthBar);
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
    mo.drawFrame(this.ctx);

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
