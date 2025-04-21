let canvas;
let ctx;
let world = new World();



function init(){
    canvas = getElementHelper('canvas');
    ctx = canvas.getContext('2d');

    console.log('My Character is', world.character);
    
}