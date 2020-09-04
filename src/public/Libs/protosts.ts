class Color {
  public red: number;
  public green: number;
  public blue: number;
  constructor() {

  }
}

class Vector {
  public x: number;
  public y: number;
  public z: number;
  constructor(X: number, Y: number, Z: number) {
    if (X !== undefined) {
      this.x = X;
    }
    if (Y !== undefined) {
      this.y = Y;
    }
    if (Z !== undefined) {
      this.z = Z;
    }
  }
}

class Block {
  private color: Color;
  private pos: Vector;
  private vertices: any;
  private obj: any;
  private size: number;
  constructor(_color: Color, _pos: Vector, _size: number) {
    this.color = _color;
    this.pos = _pos;
    this.size = _size;

    this.obj = box(this.size);
  }
}
