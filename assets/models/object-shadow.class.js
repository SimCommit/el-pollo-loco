class ObjectShadow extends MovableObject {
  /**
   * Image sequence for shadow animation.
   *
   * @type {string[]}
   */
  IMAGES_SHADOW = ["assets/img/2_character_pepe/pepes-shadow-5.png"];

  /**
   * The width of the shadow in pixels.
   *
   * @type {number}
   */
  width = 100;

  /**
   * The height of the shadow in pixels.
   *
   * @type {number}
   */
  height = 38;

  constructor(objectX, y = 395) {
    super().loadImage("assets/img/2_character_pepe/pepes-shadow-5.png");
    this.loadImages(this.IMAGES_SHADOW);
    this.x = objectX;
    this.y = y;

    this.animate();
  }

  setWorld(world) {
    this.world = world;
  }

  animate() {
    setStoppableInterval(() => {
      this.handleShadow();
    }, 1000 / 60);
  }

  handleShadow() {
    this.x = this.world.character.x;
    this.playAnimation(this.IMAGES_SHADOW);
  }
}
