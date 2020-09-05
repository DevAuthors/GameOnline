
let rot = 0;

let Pos;

let Jumping = false;
let FrameJump = 0;

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
		Pos.y = cos(radians((frameCount - FrameJump) * 2)) * 100 - 100;

		if((frameCount - FrameJump) * 2 >= 360){
			Jumping = false;
		}
	}

	translate(-Pos.x, -Pos.y, -Pos.z);
	rotateY(radians(rot));
	rotateX(radians(rot));
	new Block(
		["#654321", "#654321",
		"#008000", "#654321",
		"#654321", "#654321"], new createVector(0, 0, 0), 50).draw();
	new Block(
			["#654321", "#654321",
			"#008000", "#654321",
			"#654321", "#654321"], new createVector(100, 0, 0), 50).draw();
	new Block(
		["#654321", "#654321",
		"#008000", "#654321",
		"#654321", "#654321"], new createVector(-100, 0, 0), 50).draw();
		new Block(
			["#654321", "#654321",
			"#008000", "#654321",
			"#654321", "#654321"], new createVector(200, 0, 0), 50).draw();
}

