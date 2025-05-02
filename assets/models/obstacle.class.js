// obstacle.class.js

class Obstacle extends DrawableObject {
    offset = {
        top: 20,
        bottom: 0,
        left: 20,
        right: 20,
      };



      constructor(path, x, y, width, height){
        super();
        this.loadImage(path)
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
      }
}