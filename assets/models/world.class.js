class World {
  skybox = new Skybox();
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d"); // ???
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(this.skybox.img, this.skybox.x, this.skybox.y, this.skybox.width, this.skybox.heigth)
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.heigth);
    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.heigth);
    });
    this.clouds.forEach((cloud) => {
      this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.heigth);
    });

    // The function is repeatedly called via requestAnimationFrame
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
