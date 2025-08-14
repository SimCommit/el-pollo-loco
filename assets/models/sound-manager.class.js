// sound-manager.class.js

/**
 * @class SoundManager
 *
 * Static utility class for managing all game sounds.
 * Handles sound playback, volume settings, and cooldowns to avoid audio spam.
 */
class SoundManager {
  /**
   * Maps sound objects to their individual cooldown timers.
   * Prevents the same sound from being played repeatedly in quick succession.
   * @type {Map<Audio, number>}
   */
  static cooldowns = new Map();

  /**
   * Stores individual volume levels for each sound object.
   * Allows for fine-grained volume control.
   * @type {Map<Audio, number>}
   */
  static volumes = new Map();

  /**
   * Sound when the character dies
   * @type {HTMLAudioElement}
   *
   * */
  static CHARACTER_DEAD = new Audio("assets/audio/character/dead_1.mp3");

  /**
   * Sound when the character gets hurt
   * @type {HTMLAudioElement}
   *
   * */
  static CHARACTER_HURT = new Audio("assets/audio/character/hurt_2.mp3");

  /**
   * Sound when the character jumps
   * @type {HTMLAudioElement}
   *
   * */
  static CHARACTER_JUMP = new Audio("assets/audio/character/jump_2.mp3");

  /**
   * Sound for walking steps
   * @type {HTMLAudioElement}
   *
   * */
  static CHARACTER_WALK = new Audio("assets/audio/character/walk_2.mp3");

  /**
   * Snoring sound played during a long idle animation
   * @type {HTMLAudioElement}
   *
   * */
  static CHARACTER_LONG_IDLE = new Audio("assets/audio/character/long_idle_1.mp3");

  /**
   * Sound played when the character throws a bottle
   * @type {HTMLAudioElement}
   *
   * */
  static CHARACTER_THROW = new Audio("assets/audio/character/throw_1.mp3");

  /**
   * Sound for low bounce effect
   * @type {HTMLAudioElement}
   *
   * */
  static CHARACTER_BOUNCE_LOW = new Audio("assets/audio/character/bounce_1.mp3");

  /**
   * Sound for high bounce effect
   * @type {HTMLAudioElement}
   *
   * */
  static CHARACTER_BOUNCE_HIGH = new Audio("assets/audio/character/bounce_2.mp3");

  /**
   * Random chicken clucking sound
   * @type {HTMLAudioElement}
   *
   * */
  static CHICKEN_NOISE = new Audio("assets/audio/chicken/noise_1.mp3");

  /**
   * Frying sound played when the boss dies
   * @type {HTMLAudioElement}
   *
   * */
  static BOSS_DEAD = new Audio("assets/audio/endboss/dead_3.mp3");

  /**
   * Sound played when the boss takes damage
   * @type {HTMLAudioElement}
   *
   * */
  static BOSS_HURT = new Audio("assets/audio/endboss/hurt_1.mp3");

  /**
   * Sound played when the boss takes damage
   * @type {HTMLAudioElement}
   *
   * */
  static BOSS_HURT_2 = new Audio("assets/audio/endboss/dead_2.mp3");

  /**
   * Sound played when the boss performs an attack
   * @type {HTMLAudioElement}
   *
   * */
  static BOSS_ATTACK = new Audio("assets/audio/endboss/attack_1.mp3");

  /**
   * Intro sound played when the boss is triggered
   * @type {HTMLAudioElement}
   *
   * */
  static BOSS_INTRO = new Audio("assets/audio/endboss/intro_1.mp3");

  /**
   * Glass shattering sound played when the character throws a bottle
   * @type {HTMLAudioElement}
   *
   * */
  static BOTTLE_BREAK = new Audio("assets/audio/salsa_bottle/break_1.mp3");

  /**
   * Sound played when the player collects a bottle
   * @type {HTMLAudioElement}
   *
   * */
  static BOTTLE_COLLECT = new Audio("assets/audio/salsa_bottle/collect_1.mp3");

  /**
   * Sound played when the player collects a coin
   * @type {HTMLAudioElement}
   *
   * */
  static COIN_COLLECT = new Audio("assets/audio/coin/collect_1.mp3");

  /**
   * Sound played when the coin bar is full and a reward is triggered
   * @type {HTMLAudioElement}
   *
   * */
  static COIN_BAR_FILLED_UP = new Audio("assets/audio/coin/bar_filled_up_1.mp3");

  /**
   * Looping background music for regular gameplay
   * @type {HTMLAudioElement}
   *
   * */
  static MUSIC_BACKGROUND = new Audio("assets/audio/music/background_loop_1.mp3");

  /**
   * Intro music played before the boss fight begins
   * @type {HTMLAudioElement}
   *
   * */
  static MUSIC_BOSS_INTRO = new Audio("assets/audio/music/boss_intro_1.mp3");

  /**
   * Music played during the boss fight
   * @type {HTMLAudioElement}
   *
   * */
  static MUSIC_BOSS_FIGHT = new Audio("assets/audio/music/boss_7.mp3");

  /**
   * Music played on game over screen
   * @type {HTMLAudioElement}
   *
   * */
  static MUSIC_GAME_OVER = new Audio("assets/audio/music/game_over_1.mp3");

  /**
   * Music played during game victory screen
   * @type {HTMLAudioElement}
   *
   * */
  static MUSIC_GAME_WON = new Audio("assets/audio/music/credits_1.mp3");

  /**
   * Collection of all defined sound objects in the game.
   * Used for batch operations like muting, unmuting, or pausing all sounds.
   * @type {HTMLAudioElement[]}
   */
  static allSounds = [
    SoundManager.CHARACTER_DEAD,
    SoundManager.CHARACTER_HURT,
    SoundManager.CHARACTER_JUMP,
    SoundManager.CHARACTER_WALK,
    SoundManager.CHARACTER_LONG_IDLE,
    SoundManager.CHARACTER_THROW,
    SoundManager.CHARACTER_BOUNCE_LOW,
    SoundManager.CHARACTER_BOUNCE_HIGH,

    SoundManager.CHICKEN_NOISE,

    SoundManager.BOSS_HURT,
    SoundManager.BOSS_HURT_2,
    SoundManager.BOSS_DEAD,
    SoundManager.BOSS_ATTACK,
    SoundManager.BOSS_INTRO,

    SoundManager.BOTTLE_BREAK,
    SoundManager.BOTTLE_COLLECT,
    SoundManager.COIN_COLLECT,
    SoundManager.COIN_BAR_FILLED_UP,

    SoundManager.MUSIC_BACKGROUND,
    SoundManager.MUSIC_BOSS_INTRO,
    SoundManager.MUSIC_BOSS_FIGHT,
    SoundManager.MUSIC_GAME_OVER,
    SoundManager.MUSIC_GAME_WON,
  ];

  /**
   * Indicates whether global sound output is currently muted.
   * Used to toggle playback state for all sounds.
   * @type {boolean}
   */
  static isMuted = false;

  /**
   * Plays a sound once with specified settings.
   * Handles playback rate, volume, cooldown prevention, loop state, and starting time.
   * Skips playback if the sound is currently on cooldown.
   *
   * @param {HTMLAudioElement} sound - The sound to play.
   * @param {number} [playbackRate=1] - Speed multiplier for the sound (e.g. 0.5 = slower, 2 = faster).
   * @param {number} [volume=0.2] - Initial volume (0.0 to 1.0).
   * @param {number} [cooldown=0] - Time in ms before the sound can be played again.
   * @param {boolean} [loop=false] - Whether the sound should loop continuously.
   * @param {number} [currentTime=0] - Position (in seconds) to start playback from.
   */
  static playOne(
    sound,
    playbackRate = 1,
    volume = 0.2,
    cooldown = 0,
    loop = false,
    currentTime = 0
  ) {
    if (SoundManager.cooldowns.get(sound)) return;
    if (sound.readyState == 4) {
      SoundManager.configureSound(sound, playbackRate, volume, loop, currentTime);
      SoundManager.volumes.set(sound, sound.volume);
      if (SoundManager.isMuted) {
        sound.volume = 0;
      }
      sound.play();

      SoundManager.cooldowns.set(sound, true);
      setTimeout(() => {
        SoundManager.cooldowns.set(sound, false);
      }, cooldown);
    }
  }

  /**
   * Applies playback settings to the given sound.
   *
   * @param {HTMLAudioElement} sound - The sound to configure.
   * @param {number} playbackRate - Speed at which the sound plays.
   * @param {number} volume - Volume level (0.0 to 1.0).
   * @param {boolean} loop - Whether the sound should loop.
   * @param {number} currentTime - Start time in seconds.
   */
  static configureSound(sound, playbackRate, volume, loop, currentTime) {
    sound.playbackRate = playbackRate;
    sound.volume = volume;
    sound.loop = loop;
    sound.currentTime = currentTime;
  }

  /**
   * Stops (pauses) the given sound.
   * Playback can later be resumed with `.play()` from the current position.
   *
   * @param {HTMLAudioElement} sound - The sound to stop.
   */
  static stopOne(sound) {
    sound.pause();
  }

  /**
   * Stops (pauses) all registered sounds in the game.
   * Useful for global pause scenarios or end-of-game transitions.
   */
  static stopAll() {
    SoundManager.allSounds.forEach((sound) => {
      sound.pause();
    });
  }

  /**
   * Toggles the global mute state for all sounds.
   * Mutes or unmutes all sounds depending on the current state,
   * updates the mute button visually, and saves the state to local storage.
   */
  static toggleMuteAll() {
    blurButton(".btn");
    if (!SoundManager.isMuted) {
      SoundManager.muteAll();
    } else {
      SoundManager.unmuteAll();
    }
    saveToLocalStorage();
    updateMuteButtonState();
  }

  /**
   * Mutes all sounds by setting their volume to 0
   * and storing their current volume in a map for later restoration.
   */
  static muteAll() {
    SoundManager.allSounds.forEach((sound) => {
      SoundManager.volumes.set(sound, sound.volume);
      sound.volume = 0;
    });
    SoundManager.isMuted = true;
  }

  /**
   * Unmutes all sounds by restoring their previous volume
   * from the volume map, if available.
   */
  static unmuteAll() {
    SoundManager.allSounds.forEach((sound) => {
      const savedVolume = SoundManager.volumes.get(sound);
      if (typeof savedVolume === "number" && isFinite(savedVolume)) {
        sound.volume = savedVolume;
      }
    });
    SoundManager.isMuted = false;
  }
}
