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
    this.x = X || 0;
    this.y = Y || 0;
    this.z = Z || 0;
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
