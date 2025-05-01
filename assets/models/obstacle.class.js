// obstacle.class.js

class Obstacle extends DrawableObject {
    offset = {
        top: 20,
        bottom: 0,
        left: 20,
        right: 20,
      };

      width = 260;
      height = 260;

      constructor(path, x, y){
        super();
        this.loadImage(path)
        this.x = x;
        this.y = y;
      }
}