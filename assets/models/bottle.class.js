// bottle.class.js

class Bottle extends CollectibleObject {

    IMAGES_BOTTLE = [
        "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "assets/img/6_salsa_bottle/salsa_bottle.png",
        "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    offset = {
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
      };

    width = 50;
    height = 50;
    
    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        // this.animate();
    }

    // animate() {
    //     setInterval(() => {
    //       this.playAnimation(this.IMAGES_BOTTLE);
    //     }, 1000 / 7);
    //   }
}