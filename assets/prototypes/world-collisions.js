// world-collisions.js

World.prototype.checkCollisions = function () {
  this.checkEnemyCollisions();
  this.checkBossCollisions();
  this.checkCollectibleCollisions();
  this.checkObstacleCollisions();
};

/**
 * Checks all collisions involving regular enemies.
 */
World.prototype.checkEnemyCollisions = function () {
  this.level.enemies.forEach((enemy) => {
    this.collisionEnemy(enemy);
    this.collisionThrowable(enemy);
    this.collisionEnemyWithObstacle(enemy);
    this.collisionEnemyWithEnemy(enemy);
  });
};

/**
 * Checks all collisions involving boss enemies.
 */
World.prototype.checkBossCollisions = function () {
  this.level.bosses.forEach((boss) => {
    this.collisionEnemy(boss);
    this.collisionThrowable(boss);
  });
};

/**
 * Checks all collisions with collectible items like coins and bottles.
 */
World.prototype.checkCollectibleCollisions = function () {
  this.level.collectibleObjects.forEach((item) => {
    this.collisionCollectible(item);
  });
};

/**
 * Checks all collisions between the character and obstacles.
 */
World.prototype.checkObstacleCollisions = function () {
  this.level.obstacles.forEach((obstacle) => {
    this.collisionCharacterWithObstacle(obstacle);
  });
};

/**
 * Handles the collision between the character and an enemy.
 * Executes impact logic based on direction and enemy type.
 *
 * @param {MovableObject} enemy - The enemy object involved in the collision.
 */
World.prototype.collisionEnemy = function (enemy) {
  if (this.character.isColliding(enemy) && !this.endscreenTriggered) {
    this.handleTopImpact(enemy);

    if (enemy instanceof Endboss && !this.character.isInvincible()) {
      this.character.hit(20, "left");
    }

    this.handleEnemyContactFromSide(enemy);

    if (this.character.isHigher(enemy)) {
      enemy.hit(this.character.damage);
    }
  }
};

/**
 * Handles the reaction when the character lands on an enemy from above.
 * This causes the character to bounce and plays a sound effect.
 *
 * @param {MovableObject} enemy - The enemy the character landed on.
 */
World.prototype.handleTopImpact = function (enemy) {
  if (this.character.isHigher(enemy) && this.character.isFalling()) {
    if (enemy instanceof Chonk) {
      this.character.jump(20);
      SoundManager.playOne(SoundManager.CHARACTER_BOUNCE_HIGH, 1, 0.3, 1000);
    } else {
      this.character.jump(14);
      SoundManager.playOne(SoundManager.CHARACTER_BOUNCE_LOW, 1, 0.3, 1000);
    }
  }
};

/**
 * Handles the damage to the character when hit from the side or below by an enemy.
 * No effect occurs if the character is invincible or above the enemy.
 *
 * @param {MovableObject} enemy - The enemy that collided with the character.
 */
World.prototype.handleEnemyContactFromSide = function (enemy) {
  if (!this.character.isHigher(enemy) && !this.character.isInvincible()) {
    this.character.hit(20);
    this.healthBar.setPercentage(this.character.health);
  }
};

/**
 * Checks for collisions between one enemy and all other enemies.
 * If a collision occurs, the given enemy reverses direction.
 *
 * @param {MovableObject} enemy - The enemy being checked against others.
 */
World.prototype.collisionEnemyWithEnemy = function (enemy) {
  this.level.enemies.forEach((e) => {
    if (e.isColliding(enemy) && e != enemy && e.lastContactWith !== enemy) {
      e.x += e.otherDirection ? -3 : 3;
      enemy.x += enemy.otherDirection ? -3 : 3;
      e.lastContactWith = enemy;
      setTimeout(() => {
        e.lastContactWith = null;
      }, 200);
      this.toggleSpriteDirection(enemy);
      this.reverseSpeed(enemy);
      this.toggleSpriteDirection(e);
      this.reverseSpeed(e);
    }
  });
};

/**
 * Handles collision between the character and an obstacle.
 * Applies damage and knockback direction if contact occurs and character is not invincible.
 *
 * @param {Obstacle} obstacle - The obstacle being checked for collision.
 */
World.prototype.collisionCharacterWithObstacle = function (obstacle) {
  if (this.character.isTouchingFromLeft(obstacle) && !this.character.isInvincible()) {
    this.character.hit(20, "left");
  } else if (this.character.isTouchingFromRight(obstacle) && !this.character.isInvincible()) {
    this.character.hit(20, "right");
  } else if (this.character.isTouchingFromTop(obstacle) && !this.character.isInvincible()) {
    this.character.hit(20, "up-left");
  }
  this.healthBar.setPercentage(this.character.health);
};

/**
 * Checks whether an enemy collides with any obstacle and reverses its direction if so.
 *
 * @param {MovableObject} enemy - The enemy being checked against obstacles.
 */
World.prototype.collisionEnemyWithObstacle = function (enemy) {
  this.level.obstacles.forEach((obstacle) => {
    if (obstacle.isColliding(enemy)) {
      enemy.x += enemy.otherDirection ? -3 : 3;
      this.toggleSpriteDirection(enemy);
      this.reverseSpeed(enemy);
    }
  });
};

/**
 * Checks if any throwable object collides with an enemy or goes out of bounds.
 *
 * @param {MovableObject} enemy - The enemy object to check against.
 */
World.prototype.collisionThrowable = function (enemy) {
  this.throwableObjects.forEach((obj) => {
    if (!obj.isBroken && obj.isColliding(enemy)) {
      this.handleThrowableHit(obj, enemy);
    }

    if (!obj.isBroken && obj.y > 480) {
      this.handleThrowableOutOfBounds(obj);
    }
  });
};

/**
 * Handles the collision logic when a throwable object hits an enemy.
 *
 * @param {ThrowableObject} obj - The bottle that hit the enemy.
 * @param {MovableObject} enemy - The enemy that was hit.
 */
World.prototype.handleThrowableHit = function (obj, enemy) {
  obj.isBroken = true;
  SoundManager.playOne(SoundManager.BOTTLE_BREAK, 1, 0.3, 200);
  despawnObject(obj, this.throwableObjects, 600);
  this.killMomentum(obj);
  if (enemy instanceof Endboss) {
    this.bossHealthBars[0].setPercentage(this.level.bosses[0].health / 2.5);
    if (!enemy.canTakeDamage) {
      console.log("cant take damage atm");
      return
    }
  }
  enemy.hit(obj.damage);
};

World.prototype.killMomentum = function (o) {
  o.speedX = 0;
  o.speedY = 0;
};

/**
 * Handles the logic when a throwable object falls out of bounds.
 *
 * @param {ThrowableObject} obj - The bottle that went out of bounds.
 */
World.prototype.handleThrowableOutOfBounds = function (obj) {
  obj.isBroken = true;
  despawnObject(obj, this.throwableObjects);
};

/**
 * Checks if the character collects a collectible item and handles its effect.
 *
 * @param {CollectibleObject} item - The collectible object to check (coin or bottle).
 */
World.prototype.collisionCollectible = function (item) {
  if (this.character.isColliding(item)) {
    if (item instanceof Coin && (this.coinAmount < 50 || this.character.health < 100)) {
      this.collectCoin(item);
    }
    if (item instanceof Bottle && this.bottleAmmo < 5) {
      this.collectBottle(item);
    }
  }
};

/**
 * Handles the logic for collecting a bottle item.
 * Increases the bottle count and updates the bottle bar.
 *
 * @param {Bottle} item - The collected bottle object.
 */
World.prototype.collectBottle = function (item) {
  SoundManager.playOne(SoundManager.BOTTLE_COLLECT, 1, 0.6, 200);
  despawnObject(item, this.level.collectibleObjects);
  this.bottleAmmo++;
  this.bottleBar.setPercentage(this.bottleAmmo * 20);
};

/**
 * Handles the logic for collecting a coin.
 * Increases the coin count, updates the coin bar,
 * and triggers healing if the bar is full.
 *
 * @param {Coin} item - The collected coin object.
 */
World.prototype.collectCoin = function (item) {
  this.coinAmount++;
  SoundManager.playOne(SoundManager.COIN_COLLECT, 1, 0.05, 170);
  if (this.coinAmount < 21) {
    this.coinBar.setPercentage(this.coinAmount * 5);
  }
  this.handleFullCoinBar();
  despawnObject(item, this.level.collectibleObjects);
};

/**
 * Handles the effect when the coin bar is full.
 * Heals the character by 20 health points, resets the coin bar,
 * and plays a corresponding sound effect.
 */
World.prototype.handleFullCoinBar = function () {
  if (this.coinAmount >= 20 && this.character.health < 100) {
    this.character.health += 20;
    this.healthBar.setPercentage(this.character.health);
    if (this.character.health > 100) {
      this.character.health = 100;
    }
    this.coinAmount = 0;
    SoundManager.playOne(SoundManager.COIN_BAR_FILLED_UP, 1);
  }
};

World.prototype.preventLeavingBoundaries = function () {
  if (this.character.x < this.getLeftBoundary()) {
    this.character.x = this.getLeftBoundary() + 2;
  }

  if (this.character.x > this.level.level_end_x) {
    this.character.x = this.level.level_end_x - 2;
  }
};


/**
 * Checks for the current left level boundary.
 *
 * @returns {number}
 */
World.prototype.getLeftBoundary = function () {
  if (this.bossTriggered) {
    return 2670;
  } else {
    return -200;
  }
};
