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
	class Ray  {
		constructor(_pos, _dir){
			this.pos = _pos;
			this.dir = _dir;
		}
	}
	class Block {
		constructor(_color, _pos, _size) {
			this.color = _color;
			this.pos = _pos;
			this.size = _size;

			this.visible = true;
			this.visibleFace = new Array(6);

			this.visibleFace.fill(true);
		}

		drawFaces(){
			const Size = this.size;
			strokeWeight(2);
			stroke(0);

			// BACK
			if (this.visibleFace[0]) {
				fill(this.color[0]);
				face([
					[-Size, -Size, -Size],
					[+Size, -Size, -Size],
					[+Size, +Size, -Size],
					[-Size, +Size, -Size]
				]);
			}

			// FRONT
			if(this.visibleFace[1]){
				fill(this.color[1]);
				face([
					[-Size, -Size, +Size],
					[+Size, -Size, +Size],
					[+Size, +Size, +Size],
					[-Size, +Size, +Size]
				]);
			}

			// TOP
			if(this.visibleFace){
				fill(this.color[2]);
				face([
					[-Size, -Size, -Size],
					[+Size, -Size, -Size],
					[+Size, -Size, +Size],
					[-Size, -Size, +Size]
				]);
			}

			// BOTTOM
			if (this.visibleFace[3]) {
				fill(this.color[3]);
				face([
					[-Size, +Size, -Size],
					[+Size, +Size, -Size],
					[+Size, +Size, +Size],
					[-Size, +Size, +Size]
				]);
			}

			// LEFT
			if (this.visibleFace[4]) {
				fill(this.color[4]);
				// noFill();
				face([
					[-Size, -Size, -Size],
					[-Size, +Size, -Size],
					[-Size, +Size, +Size],
					[-Size, -Size, +Size]
				]);
			}
			
			// RIGHT
			if(this.visibleFace[5]){
				fill(this.color[5]);
				face([
					[+Size, -Size, -Size],
					[+Size, +Size, -Size],
					[+Size, +Size, +Size],
					[+Size, -Size, +Size]
				]);
			}

			function face(poss){
				beginShape();
					vertex(poss[0][0] - 1, poss[0][1] - 1, poss[0][2] - 1);
					vertex(poss[1][0] - 1, poss[1][1] - 1, poss[1][2] - 1);
					vertex(poss[2][0] - 1, poss[2][1] - 1, poss[2][2] - 1);
					vertex(poss[3][0] - 1, poss[3][1] - 1, poss[3][2] - 1);
				endShape(CLOSE);
			}
		}

		draw(){
			translate(this.pos.x, this.pos.y, this.pos.z);
			this.drawFaces();
			translate(-this.pos.x, -this.pos.y, -this.pos.z);
		}
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

		G.Keys = Keys;
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

		G.Keys = Keys;
	}

	G.Block = Block;
	G.Keys = Keys;
})(window || this);