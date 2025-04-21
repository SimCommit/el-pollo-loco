class MovableObject {
  x = 120;
  y = 250;
  img;
  heigth = 150;
  width = 100;

  //   loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') <img id="image">
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving Right");
  }

  moveLeft() {
    console.log("Moving Left");
  }
}
