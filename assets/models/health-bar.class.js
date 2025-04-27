// health-bar.class.js

class HealthBar extends StatusBar {
  IMAGES = [
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];
  y = 10;
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
  }
}
