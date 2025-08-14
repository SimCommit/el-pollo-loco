// world-events.js

/**
 * Checks whether the character is close enough to trigger the boss encounter.
 * If the boss has not been triggered yet and the distance condition is met,
 * the boss intro sequence is started.
 */
World.prototype.checkBossTrigger = function () {
  if (
    !this.bossTriggered &&
    this.isCloseToCharacter(this.level.bosses[0], this.BOSS_TRIGGER_RANGE)
  ) {
    this.startBossEncounter();
  }
};

/**
 * Initiates the boss encounter by playing the intro sequence
 * and scheduling the boss fight start.
 */
World.prototype.startBossEncounter = function () {
  this.handleBossIntroStart();
  this.handleBossFightStart();
};

/**
 * Handles the start of the boss intro sequence.
 * Plays intro music, triggers animation, hides UI, and schedules boss voice.
 */
World.prototype.handleBossIntroStart = function () {
  this.level.bosses[0].animate();
  this.bossTriggered = true;
  hideGameMenuButtons();
  SoundManager.stopOne(SoundManager.MUSIC_BACKGROUND);
  SoundManager.playOne(SoundManager.MUSIC_BOSS_INTRO);
  setTimeout(() => {
    SoundManager.playOne(SoundManager.BOSS_INTRO, 1, 0.3);
  }, 1500);
};

/**
 * Handles the start of the actual boss fight after the intro.
 * Plays boss fight music, shows menu buttons, and adds the health bar.
 */
World.prototype.handleBossFightStart = function () {
  setTimeout(() => {
    SoundManager.playOne(SoundManager.MUSIC_BOSS_FIGHT, 1, 0.2, 0, true);
    let endbossHealthBar = new EndbossHealthBar(this.level.bosses[0]);
    this.bossHealthBars.push(endbossHealthBar);
    this.introPlayed = true;
    showGameMenuButtons();
  }, this.INTRO_LENGTH);
};

/**
 * Checks if the character's health has dropped to zero or below.
 * If so, triggers the endscreen with defeat after a short delay and stops the game.
 */
World.prototype.checkCharacterDefeat = function () {
  if (this.character.health <= 0 && !this.endscreenTriggered) {
    this.endscreenTriggered = true;
    setTimeout(() => {
      this.showEndscreen(false);
      stopAllIntervals();
    }, 2000);
  }
};

/**
 * Checks all regular enemies for defeat (health <= 0).
 * If an enemy is defeated, it is marked for despawn and removed after a delay.
 */
World.prototype.checkEnemyDefeat = function () {
  this.level.enemies.forEach((enemy) => {
    if (enemy.health <= 0 && !enemy.isMarkedForDespawn) {
      enemy.isMarkedForDespawn = true;
      despawnObject(enemy, this.level.enemies, 2000);
    }
  });
};

/**
 * Checks if the boss has been defeated.
 * If so, triggers the win endscreen after a sequence of delays and stops all sounds and intervals.
 */
World.prototype.checkBossDefeat = function () {
  if (this.level.bosses[0].health <= 0 && !this.endscreenTriggered) {
    this.endscreenTriggered = true;
    this.bossHealthBars = [];
    setTimeout(() => {
      SoundManager.stopAll();
    }, 3400);
    setTimeout(() => {
      this.showEndscreen(true);
      stopAllIntervals();
    }, 4000);
  }
};

/**
 * Checks whether a helper Chonk should spawn and triggers the spawn if allowed.
 * Applies a cooldown of 4 seconds to prevent repeated spawns.
 */
World.prototype.checkChonkSpawn = function () {
  if (this.shouldChonkSpawn()) {
    this.spawnChonk();
    this.spawnOnCooldown = true;
    setTimeout(() => {
      this.spawnOnCooldown = false;
    }, 4000);
  }
};

/**
 * Determines whether a helper Chonk can currently be spawned.
 * Conditions: near the trigger point, no active cooldown, no other Chonk present.
 *
 * @returns {boolean} True if a Chonk should be spawned, otherwise false.
 */
World.prototype.shouldChonkSpawn = function () {
  return (
    this.isCloseToCharacter(this.level.obstacles[2], 400) &&
    !this.spawnOnCooldown &&
    !this.areChonksAlive()
  );
};

/**
 * Spawns a new helper Chonk, positions it, and reverses its movement direction.
 */
World.prototype.spawnChonk = function () {
  let helperChonk = new Chonk(2400, 328, true);
  helperChonk.otherDirection = true;
  this.reverseSpeed(helperChonk);
  this.level.enemies.push(helperChonk);
};

/**
 * Checks whether at least one Chonk is currently present in the enemy list.
 *
 * @returns {boolean} True if any Chonk is alive, otherwise false.
 */
World.prototype.areChonksAlive = function () {
  return this.level.enemies.some((enemy) => enemy instanceof Chonk);
};

/**
 * Triggers a chicken sound effect if any enemy is close to the character.
 * Plays the sound once per enemy within range, using SoundManager cooldown.
 */
World.prototype.checkChickenSoundTrigger = function () {
  this.level.enemies.forEach((enemy) => {
    if (this.isCloseToCharacter(enemy, 200)) {
      SoundManager.playOne(SoundManager.CHICKEN_NOISE, 1, 0.2, 5000);
    }
  });
};

/**
 * Checks whether a given object is within a certain horizontal distance to the character.
 *
 * @param {{ x: number }} other - The object to compare with the character.
 * @param {number} distance - The maximum distance allowed.
 * @returns {boolean} True if the object is close to the character, otherwise false.
 */
World.prototype.isCloseToCharacter = function (other, distance) {
  return Math.abs(other.x - this.character.x) < distance;
};

/**
 * Checks whether another object is positioned to the left of the character (by x-coordinate).
 *
 * @param {{ x: number }} other - The object to compare with the character.
 * @returns {boolean} True if the object is left of the character, otherwise false.
 */
World.prototype.isLeftFromCharacter = function (other) {
  return other.x < this.character.x;
};

/**
 * Checks whether the boss intro sequence is currently playing.
 *
 * @returns {boolean} True if the intro has started but not yet finished.
 */
World.prototype.isPlayingIntro = function () {
  return this.bossTriggered && !this.introPlayed;
};

/**
 * Checks whether a bottle can be thrown and initiates the throw if allowed.
 */
World.prototype.checkThrowObjects = function () {
  if (this.canThrowBottle()) {
    this.throwBottle();
  }
};

/**
 * Determines whether the player is currently allowed to throw a bottle.
 * Conditions: key pressed, not on cooldown, ammo available,
 * character not frozen, and not currently recovering from damage.
 *
 * @returns {boolean} True if a bottle can be thrown, otherwise false.
 */
World.prototype.canThrowBottle = function () {
  return (
    this.keyboard.D &&
    !this.bottleOnCooldown &&
    this.bottleAmmo > 0 &&
    this.character.currentState != "frozen" &&
    !this.character.hitOnCooldown
  );
};

/**
 * Performs the bottle throw: creates the throwable object,
 * reduces ammo, updates the bottle bar, and applies cooldown.
 */
World.prototype.throwBottle = function () {
  this.bottleOnCooldown = true;
  this.bottleAmmo--;
  let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 70);
  this.throwableObjects.push(bottle);
  this.bottleBar.setPercentage(this.bottleAmmo * 20);
  setTimeout(() => {
    this.bottleOnCooldown = false;
  }, 500);
};

/**
 * Displays the endscreen based on whether the player has won or lost.
 * Clears the status bars and switches the UI into endscreen mode.
 *
 * @param {boolean} [won=false] - True if the game was won, false if lost.
 */
World.prototype.showEndscreen = function (won = false) {
  if (won) {
    this.handleEndscreenWon();
  } else {
    this.handleEndscreenLost();
  }
  this.statusBars = [];
  hideGameMenuButtons();
  hideControlButtons();
  showEndscreenButtons();
};

/**
 * Handles the endscreen display and music when the player wins the game.
 * Adds a centered "You Win" UI object and plays victory music.
 */
World.prototype.handleEndscreenWon = function () {
  let wonScreen = new UiObject(156, 190, 400, 90, true);
  this.endscreenObjects.push(wonScreen);
  SoundManager.playOne(SoundManager.MUSIC_GAME_WON, 1, 0.15, 0);
};

/**
 * Handles the endscreen display and music when the player loses the game.
 * Adds a full-screen "Game Over" UI object, stops all sounds, and plays defeat music.
 */
World.prototype.handleEndscreenLost = function () {
  let lostScreen = new UiObject(0, 0, 720, 480, false);
  this.endscreenObjects.push(lostScreen);
  SoundManager.stopAll();
  SoundManager.playOne(SoundManager.MUSIC_GAME_OVER, 1, 0.15, 0);
};
