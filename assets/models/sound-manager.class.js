// sound-manager.class.js

class SoundManager {
  static cooldowns = new Map();

  static CHARACTER_DEAD = new Audio("assets/audio/character/dead_1.mp3");
  static CHARACTER_WALK = new Audio("assets/audio/character/walk_2.mp3");
  static CHARACTER_JUMP = new Audio("assets/audio/character/jump_2.mp3");

  static CHARACTER_THROW = new Audio("assets/audio/character/throw_1.mp3");

  static allSounds = [
    SoundManager.CHARACTER_DEAD,
    SoundManager.CHARACTER_WALK,
    SoundManager.CHARACTER_JUMP,
    SoundManager.CHARACTER_THROW,
  ];

  static playOne(sound, playbackRate, volume, cooldown, loop = false, currentTime = 0) {
    if (SoundManager.cooldowns.get(sound)) return;
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

  static stopAll() {
    SoundManager.allSounds.forEach((sound) => {
      sound.pause();
    });
  }
}
