let canvas;
let world;



function init(){
    canvas = getElementHelper('canvas');
    world = new World(canvas);

    console.log('My Character is', world.character);  
}