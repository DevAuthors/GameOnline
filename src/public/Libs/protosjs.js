class Color {
	constructor() {

	}
}
	
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
	
class Block {
	constructor(_color, _pos, _size) {
		this.color = _color;
		this.pos = _pos;
		this.size = _size;

		this.verts = [
			[_pos.x, 			_pos.y, 			_pos.z],
			[_pos.x + _size, 	_pos.y, 			_pos.z],
			[_pos.x + _size, 	_pos.y + _size, 	_pos.z],
			[_pos.x, 			_pos.y + _size, 	_pos.z],

			[_pos.x, 			_pos.y, 			_pos.z + _size],
			[_pos.x + _size, 	_pos.y, 			_pos.z + _size],
			[_pos.x + _size, 	_pos.y + _size, 	_pos.z + _size],
			[_pos.x, 			_pos.y + _size, 	_pos.z + _size]
		];
	}

	draw(){
		fill(color(0, 0, 255));
		strokeWeight(2);
		const verts = this.verts;
		beginShape(QUADS);

			// Front
			fill(0, 255, 0);
			face(0, 1, 2, 3);

			// Back
			fill(0, 0, 255);
			face(4, 5, 6, 7);

			// Left
			fill(255, 0, 0);
			face(7, 3, 0, 4);

			face(5, 1, 2, 6);
			
		endShape();

		function face(i1, i2, i3, i4){
			vertex(verts[i1][0], verts[i1][1], verts[i1][2]);
			vertex(verts[i2][0], verts[i2][1], verts[i2][2]);
			vertex(verts[i3][0], verts[i3][1], verts[i3][2]);
			vertex(verts[i4][0], verts[i4][1], verts[i4][2]);
			//vertex(verts[i1][0], verts[i1][1], verts[i1][2]);
		}
	}
}
	