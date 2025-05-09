// sound-manager.class.js

class SoundManager {
  static cooldowns = new Map();

  static CHARACTER_DEAD = new Audio("assets/audio/character/dead_1.mp3");
  static CHARACTER_HURT = new Audio("assets/audio/character/hurt_2.mp3");
  static CHARACTER_JUMP = new Audio("assets/audio/character/jump_2.mp3");
  static CHARACTER_WALK = new Audio("assets/audio/character/walk_2.mp3");
  static CHARACTER_LONG_IDLE = new Audio("assets/audio/character/long_idle_1.mp3");
  static CHARACTER_THROW = new Audio("assets/audio/character/throw_1.mp3");

  static MUSIC_BACKGROUND = new Audio("assets/audio/music/background_loop_1.mp3");
  static MUSIC_BOSS_INTRO = new Audio("assets/audio/music/boss_intro_1.mp3");
  static MUSIC_BOSS_FIGHT = new Audio("assets/audio/music/boss_7.mp3");
  static MUSIC_GAME_OVER = new Audio("assets/audio/music/game_over_1.mp3");
  static MUSIC_GAME_WON = new Audio("");


  static allSounds = [
    SoundManager.CHARACTER_DEAD,
    SoundManager.CHARACTER_HURT,
    SoundManager.CHARACTER_JUMP,
    SoundManager.CHARACTER_WALK,
    SoundManager.CHARACTER_LONG_IDLE,
    SoundManager.CHARACTER_THROW,
    SoundManager.MUSIC_BACKGROUND,
    SoundManager.MUSIC_BOSS_INTRO,
    SoundManager.MUSIC_BOSS_FIGHT,
    SoundManager.MUSIC_GAME_OVER,
    SoundManager.MUSIC_GAME_WON,
  ];

  static playOne(sound, playbackRate, volume, cooldown, loop = false, currentTime = 0) {
    if (SoundManager.cooldowns.get(sound)) return;
    if (sound.readyState == 4) {
      sound.playbackRate = playbackRate;
      sound.volume = volume;
      sound.loop = loop;
      sound.currentTime = currentTime; // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
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
}
