class Vector {
	constructor(X, Y, Z) {
		this.x = X || null;
		this.y = Y || null;
		this.z = Z || null;

		this.Dim = arguments.length;
	}

	normalize(){
		if(this.Dim > 1){
			if(this.Dim == 2){
				const len = Math.sqrt(this.x ** 2 + this.y ** 2);
				this.x /= len;
				this.y /= len;
				return this;
			}else 
			if(this.Dim == 3){
				const len = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
				this.x /= len;
				this.y /= len;
				this.z /= len;
				return this;
			}
		}else{
			return null;
		}
	}
}

(function(G){
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

			if (this.visibleFace[0]) {
				// BACK
				fill(this.color[0]);
				face([
					[-Size, -Size, -Size],
					[+Size, -Size, -Size],
					[+Size, +Size, -Size],
					[-Size, +Size, -Size]
				]);
			}

			if(this.visibleFace[1]){
				// FRONT
				fill(this.color[1]);
				face([
					[-Size, -Size, +Size],
					[+Size, -Size, +Size],
					[+Size, +Size, +Size],
					[-Size, +Size, +Size]
				]);
			}

			if(this.visibleFace){
				// TOP
				fill(this.color[2]);
				face([
					[-Size, -Size, -Size],
					[+Size, -Size, -Size],
					[+Size, -Size, +Size],
					[-Size, -Size, +Size]
				]);
			}

			if (this.visibleFace[3]) {
				// BOTTOM
				fill(this.color[3]);
				face([
					[-Size, +Size, -Size],
					[+Size, +Size, -Size],
					[+Size, +Size, +Size],
					[-Size, +Size, +Size]
				]);
			}

			if (this.visibleFace[4]) {
				// LEFT
				fill(this.color[4]);
				face([
					[-Size, -Size, -Size],
					[-Size, +Size, -Size],
					[-Size, +Size, +Size],
					[-Size, -Size, +Size]
				]);
			}
			
			if(this.visibleFace[5]){
				// RIGHT
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
			this.drawFaces();
		}
	}

	const Keys = [];
	G.onkeydown = e => {
		const K = e.keyCode;
		let Searched = true;

		Keys.map((elm, i) => {
			if(Searched){
				if(elm == K){
					Searched = false;
					return;
				}
			}else{
				return;
			}
		});

		if(Searched){
			Keys.unshift({
				Code: K,
				Key: e.key,
				isShifted: e.shiftKey,
				isCtrled: e.ctrlKey,
				CodeLower: (K >= 65 && K <= 90? e.key.toLowerCase().charCodeAt(): K)
			});
		}

		G.Keys = Keys;
	}

	G.onkeyup = e => {
		const K = e.keyCode;
		let Searched = true;
		let AN = null;

		Keys.map((elm, i) => {
			if(Searched){
				if(elm.Code == K){
					Searched = false;
					AN = i;
					return;
				}
			}else{
				return;
			}
		});

		if((!Searched) && (AN !== null)){
			Keys.splice(AN, 1);
		}

		G.Keys = Keys;
	}

	G.Block = Block;
	G.Keys = Keys;
})(window || this);