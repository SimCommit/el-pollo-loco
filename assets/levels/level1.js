// level1.js

let level1 = new Level(
  [new Chicken(200), new Chicken(300), new Chicken(400), new Chicken(500), new Endboss()],
  [new Cloud(200, 1), new Cloud(900, 2), new Cloud(1400, 1)],
  [
    new BackgroundObject("assets/img/5_background/layers/air.png", -719),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("assets/img/5_background/layers/air.png", 0),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("assets/img/5_background/layers/air.png", 719),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", 719 * 2),
    new BackgroundObject("assets/img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719 * 3),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png", 719 * 3),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", 719 * 3),
  ],
  [
    new Bottle(-70, 375),
    new Bottle(550, 375),
    new Bottle(900, 375),
    new Bottle(1000, 375),
    new Bottle(1900, 375),
  ]
);
