// sound-manager.class.js

class SoundManager {
  static cooldowns = new Map();
  static volumes = new Map();

  static CHARACTER_DEAD = new Audio("assets/audio/character/dead_1.mp3");
  static CHARACTER_HURT = new Audio("assets/audio/character/hurt_2.mp3");
  static CHARACTER_JUMP = new Audio("assets/audio/character/jump_2.mp3");
  static CHARACTER_WALK = new Audio("assets/audio/character/walk_2.mp3");
  static CHARACTER_LONG_IDLE = new Audio("assets/audio/character/long_idle_1.mp3");
  static CHARACTER_THROW = new Audio("assets/audio/character/throw_1.mp3");
  static CHARACTER_BOUNCE_LOW = new Audio("assets/audio/character/bounce_1.mp3");
  static CHARACTER_BOUNCE_HIGH = new Audio("assets/audio/character/bounce_2.mp3");

  static CHICKEN_NOISE = new Audio("assets/audio/chicken/noise_1.mp3");

  static BOSS_DEAD = new Audio("assets/audio/endboss/dead_3.mp3");
  static BOSS_HURT = new Audio("assets/audio/endboss/hurt_1.mp3");
  static BOSS_ATTACK = new Audio("assets/audio/endboss/attack_1.mp3");
  static BOSS_INTRO = new Audio("assets/audio/endboss/intro_1.mp3");

  static BOTTLE_BREAK = new Audio("assets/audio/salsa_bottle/break_1.mp3");
  static BOTTLE_COLLECT = new Audio("assets/audio/salsa_bottle/collect_1.mp3");
  static COIN_COLLECT = new Audio("assets/audio/coin/collect_1.mp3");

  static MUSIC_BACKGROUND = new Audio("assets/audio/music/background_loop_1.mp3");
  static MUSIC_BOSS_INTRO = new Audio("assets/audio/music/boss_intro_1.mp3");
  static MUSIC_BOSS_FIGHT = new Audio("assets/audio/music/boss_7.mp3");
  static MUSIC_GAME_OVER = new Audio("assets/audio/music/game_over_1.mp3");
  static MUSIC_GAME_WON = new Audio("assets/audio/music/credits_1.mp3");

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
    SoundManager.BOSS_DEAD,
    SoundManager.BOSS_ATTACK,
    SoundManager.BOSS_INTRO,

    SoundManager.BOTTLE_BREAK,
    SoundManager.BOTTLE_COLLECT,
    SoundManager.COIN_COLLECT,

    SoundManager.MUSIC_BACKGROUND,
    SoundManager.MUSIC_BOSS_INTRO,
    SoundManager.MUSIC_BOSS_FIGHT,
    SoundManager.MUSIC_GAME_OVER,
    SoundManager.MUSIC_GAME_WON,
  ];

  static isMuted = false;

  static playOne(sound, playbackRate = 1, volume = 0.2, cooldown = 0, loop = false, currentTime = 0) {
      if (SoundManager.cooldowns.get(sound)) return;
      if (sound.readyState == 4) {
          sound.playbackRate = playbackRate;
          sound.volume = volume;
          sound.loop = loop;
          sound.currentTime = currentTime; // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
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

  static stopOne(sound) {
    sound.pause();
  }

  static stopAll() {
    SoundManager.allSounds.forEach((sound) => {
      sound.pause();
    });
  }

  static toggleMuteAll() {
    let button = getElementByIdHelper("mute-btn");
    button.classList.toggle("btn-muted");
    blurButton(".btn");
    if (!SoundManager.isMuted) {
      SoundManager.allSounds.forEach((sound) => {
        SoundManager.volumes.set(sound, sound.volume);
        sound.volume = 0;
        SoundManager.isMuted = true;
      });
    } else {
      SoundManager.allSounds.forEach((sound) => {
        sound.volume = SoundManager.volumes.get(sound);
        SoundManager.isMuted = false;
      });
    }
  }
}
