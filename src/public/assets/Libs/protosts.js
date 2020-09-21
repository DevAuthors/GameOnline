var Color = /** @class */ (function () {
    function Color() {
    }
    return Color;
}());
var Vector = /** @class */ (function () {
    function Vector(X, Y, Z) {
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
    return Vector;
}());
var Block = /** @class */ (function () {
    function Block(_color, _pos, _size) {
        this.color = _color;
        this.pos = _pos;
        this.size = _size;
        this.obj = box(this.size);
    }
    return Block;
}());
