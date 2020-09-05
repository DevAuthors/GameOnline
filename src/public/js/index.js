
let rot = 0;

let Pos;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);

  Pos = createVector(0, 0, 0);
}

function draw(){
  background(255);
  if(mouseIsPressed){
    rot++;
  }
  Keys.map(Key => {
    switch (Key.CodeLower) {
      case 114:
        rot = 0;
        break;
      case 97:
        Pos.x -= 5;
        break;
      case 100:
        Pos.x += 5;
        break;
      case 119:
        Pos.z -= 5;
        break;
      case 115:
        Pos.z += 5;
        break;
    }
  });

  translate(-Pos.x, -Pos.y, -Pos.z);
  rotateY(radians(rot));
  rotateX(radians(rot));
  new Block(
    ["#654321", "#654321",
    "#008000", "#654321",
    "#654321", "#654321"], new Vector(6, 6, 6), 50).draw();
}

