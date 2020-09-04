
let rot = 0;

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
}

function draw(){
  background(255);
  //rotateY(radians(frameCount));
  if(mouseIsPressed){
    rot++;
  }
  if(keyIsPressed){
    if(key === 'a'){
      rot = 0;
    }
  }
  rotateY(radians(rot));
  new Block(6, new Vector(6, 6, 6), 50).draw();
}

