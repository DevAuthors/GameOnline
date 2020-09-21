
let rot = 0;

let Pos;

let Jumping = false;
let FrameJump = 0;

let Camera;

globalThis.drawQueue = {};

function preload() {
	loadAllTextures();
}
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	perspective(PI / 3.0, width / height, 0.01, 1000);

	Pos = createVector(0, 0, 0);

	Camera = new Protos.FirstPersonCamera();

	Map.Setup();
}

function draw(){
	background(255);
	noStroke();
	Protos.setFloor(color("#008000"), 500, Pos);
	Protos.drawQueue(drawQueue);
	//drawQueue = [];
	if(mouseIsPressed){
		//rot++;
	}

	Camera.update();

	Protos.Keys.map(Key => {
		switch (Key.codeLower) {
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
			case 32:
				if(!Jumping){
					Jumping = true;
					FrameJump = frameCount;
				}
				break;
		}
	});

	if(Jumping){
		const FF = (frameCount - FrameJump) * 4;
		const Power = 70;
		Pos.y = cos(radians(FF)) * Power - Power;

		if(FF >= 360){
			Jumping = false;
		}
	}

	translate(-Pos.x, -Pos.y, -Pos.z);
	rotateY(radians(rot));
	//rotateX(radians(rot));

	Map.map.map(e => {
		e.map(e => {
			e.draw();
		});
	});

	rotateY(radians(-rot));
	//rotateX(radians(-rot));
	translate(Pos.x, Pos.y, Pos.z);

	globalThis.drawSocket("cube", {x: Pos.x, y: Pos.y, z: Pos.z}, 50)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}