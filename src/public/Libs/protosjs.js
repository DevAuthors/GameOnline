// UNUSED CODE --- Vector Template
// class Vector {
// 	constructor(X, Y, Z) {
// 		this.x = X || null;
// 		this.y = Y || null;
// 		this.z = Z || null;
// 		this.Dim = arguments.length;
// 	}
// 	normalize(){
// 		if(this.Dim > 1){
// 			if(this.Dim == 2){
// 				const len = Math.sqrt(this.x ** 2 + this.y ** 2);
// 				this.x /= len;
// 				this.y /= len;
// 				return this;
// 			}else 
// 			if(this.Dim == 3){
// 				const len = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
// 				this.x /= len;
// 				this.y /= len;
// 				this.z /= len;
// 				return this;
// 			}
// 		}else{
// 			return null;
// 		}
// 	}
// }

(function(G){

	Math.__proto__.getAngle = function(values) {
		const X = round(degrees(acos(values.x)));
		const Y = round(degrees(asin(values.y)));
		return Y < 0 ? radians(360 - X): radians(X);
	}

	/**
	 * 
	 * @param {PVector} Line1_Pos 
	 * @param {PVector} Line1_Dir 
	 * @param {PVector} Line2_PosA 
	 * @param {PVector} Line2_PosB 
	 * 
	 * @returns
	 */
	Math.__proto__.cross2D = function(Line1_Pos, Line1_Dir, Line2_PosA, Line2_PosB) {
			const x1 = Line2_PosA.x;
			const y1 = Line2_PosA.y;
			const x2 = Line2_PosB.x;
			const y2 = Line2_PosB.y;

			const x3 = Line1_Pos.x;
			const y3 = Line1_Pos.y;
			const x4 = x3 + Line1_Dir.x;
			const y4 = y3 + Line1_Dir.y;

			const Den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

			const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / Den;
			const u = ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / Den;

			if(t > 0 && t < 1 && u > 0){
				return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
			}
			return null;
	}

	/**
	 *	@class Block
	 *	@param {a.default.Image[]} _color (Texture or colors Array)
	 *	@param {PVector} _pos (PVector)
	 *	@param {Number} _size (int)
	 *
	 *	@method drawFaces void
	 *	@method draw void
	**/
	class Block {
		constructor(_color, _pos, _size) {
			this.color = _color;
			this.pos = createVector(_pos.x * _size, -_pos.y * _size, _pos.z * _size);
			this.size = _size;

			this.visible = true;
			this.visibleFace = new Array(6);

			this.visibleFace.fill(true);

			this.color.map(e => {
				e.resize(1, 1);
			});
		}

		update(neighbors){

		}

		drawFaces(){
			const Size = this.size;
			strokeWeight(4);
			stroke(0);

			// BACK
			if (this.visibleFace[0]) {
				//fill(this.color[0]);
				texture(this.color[0]);
				//console.log(this.color[0]);
				face([
					[0, 	0, 		0],
					[+Size, 0, 		0],
					[+Size, +Size, 	0],
					[0, 	+Size, 	0]
				]);
			}

			// FRONT
			if(this.visibleFace[1]){
				// fill(this.color[1]);
				texture(this.color[1]);
				face([
					[0, 	0, 		+Size],
					[+Size, 0, 		+Size],
					[+Size, +Size, 	+Size],
					[0, 	+Size, 	+Size]
				]);
			}

			// TOP
			if(this.visibleFace){
				// fill(this.color[2]);
				texture(this.color[2]);
				face([
					[0, 	0, 		0],
					[+Size, 0, 		0],
					[+Size, 0, 		+Size],
					[0, 	0, 		+Size]
				]);
			}

			// BOTTOM
			if (this.visibleFace[3]) {
				// fill(this.color[3]);
				texture(this.color[3]);
				face([
					[0, 	+Size, 	0],
					[+Size, +Size, 	0],
					[+Size, +Size, 	+Size],
					[0, 	+Size, 	+Size]
				]);
			}

			// LEFT
			if (this.visibleFace[4]) {
				// fill(this.color[4]);
				texture(this.color[4]);
				// noFill();
				face([
					[0, 	0, 		0],
					[0, 	+Size, 	0],
					[0, 	+Size, 	+Size],
					[0, 	0, 		+Size]
				]);
			}
			
			// RIGHT
			if(this.visibleFace[5]){
				// fill(this.color[5]);
				texture(this.color[5]);
				face([
					[+Size, 0, 		0],
					[+Size, +Size, 	0],
					[+Size, +Size, 	+Size],
					[+Size, 0, 		+Size]
				]);
			}

			function face(poss){
				beginShape();
					vertex(poss[0][0] - 2, poss[0][1] - 2, poss[0][2] - 2);
					vertex(poss[1][0] - 2, poss[1][1] - 2, poss[1][2] - 2);
					vertex(poss[2][0] - 2, poss[2][1] - 2, poss[2][2] - 2);
					vertex(poss[3][0] - 2, poss[3][1] - 2, poss[3][2] - 2);
				endShape(CLOSE);
			}
		}

		draw(){
			translate(this.pos.x, this.pos.y, this.pos.z);
			this.drawFaces();
			translate(-this.pos.x, -this.pos.y, -this.pos.z);
		}
	}

	class FP_Camera {
		constructor(){
			this.last = createVector(0, 0);	/** @Private */
			this.tmp = createVector(0, 0);	/** @Private */
			this.diff = createVector(0, 0);	/** @Private */
			this.view = createVector(0, 0); /** @Public */

			this.pressed = false; 			/** @Private */

			this.pos = createVector(0, 0); 	/** @Public */
			this.sens = 1;					/** @Public */

		}

		getViewCords(){
			const Cords = createVector();
			Cords.x = 0;
		}

		update(){
			const m = createVector(mouseX, mouseY);

			if(mouseIsPressed){
				if(this.pressed){
					this.diff = createVector(m.x - this.tmp.x, m.y - this.tmp.y);

					this.pos.x = this.last.x + this.diff.x * this.sens;
					this.pos.y = this.last.y + this.diff.y * this.sens;
				}else{
					this.tmp = m;

					this.pressed = true;

					return;
				}
			}else{
				this.last.x += this.diff.x;
				this.last.y += this.diff.y;

				this.diff = createVector(0, 0);

				this.pos = this.last;

				this.pressed = false;
			}

			function cdr2ang(value, range){
				const max = range / 2;
				return radians(value / range);
			}

			function ang2cdr(value, range) {
				const max = range / 2;
				return degrees(value) * max;
			}

			this.view.x = cdr2ang(this.pos.x, width);
			this.view.y = cdr2ang(this.pos.y, height);

			this.pos = createVector(ang2cdr(this.view.x, width), ang2cdr(this.view.y, height))

			camera(	30, 		0, 			220,
					this.pos.x, this.pos.y, this.pos.z,
					0, 			1, 			0);
			return;
		}
	}

	function floor(color, size, Pos) {
		fill(color);
		beginShape();
			vertex(-size, +50 - Pos.y, -size);
			vertex(+size, +50 - Pos.y, -size);
			vertex(+size, +50 - Pos.y, +size);
			vertex(-size, +50 - Pos.y, +size);
		endShape(CLOSE);
	}

	const Keys = [];
	G.onkeydown = e => {
		const K = e.keyCode;
		let Found = false;
		let FoundPos = 0;

		Keys.find((e, i) => {
			if(e.code == K){
				Found = true;
				FoundPos = i;
			}
		});

		if(!Found){
			Keys.unshift({
				code: K,
				key: e.key,
				isShifted: e.shiftKey,
				isCtrled: e.ctrlKey,
				codeLower: (K >= 65 && K <= 90? e.key.toLowerCase().charCodeAt(): K)
			});
		}

		keysUpdt();
	}

	G.onkeyup = e => {
		const K = e.keyCode;
		let Found = false;
		let FoundPos = 0;

		Keys.find((e, i) => {
			if(e.code == K){
				Found = true;
				FoundPos = i;
			}
		});

		if(Found){
			Keys.splice(FoundPos, 1);
		}

		keysUpdt();
	}
	function keysUpdt(){
		addToGlobal("Keys", Keys);
	}

	G.Math = Math;
	G.Protos = {};
	function addToGlobal(Name, value){
		G.Protos[Name] = value;
	}

	addToGlobal("Block", Block);
	addToGlobal("Keys", Keys);
	addToGlobal("setFloor", floor);
	addToGlobal("FirstPersonCamera", FP_Camera);
})(window || this);