// endboss-health-bar.class.js

class EndbossHealthBar extends StatusBar {
  IMAGES = [
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];
  width = 270;
  height = 60;

  percentage = 100;

  constructor(boss) {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = boss.x;
    this.y = boss.y - 20;
    this.boss = boss;
    this.animate();
  }

  animate() {
    setInterval(() => {
        this.stickToBoss();
    }, 1000 / 30);
  }

  stickToBoss() {
    this.x = this.boss.x + 10;
    this.y = this.boss.y - 40;
  }
}
