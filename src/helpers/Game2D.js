class Player {
    constructor(pos, color, sizes, vel){
        this.pos = pos;
        this.color = color;
        this.sizes = sizes;
        this.vel = vel;
    }

    move(x, y){
        this.pos.x += x * this.vel.x;
        this.pos.y += y * this.vel.y;
    }

    jumpTo(x, y){
        this.pos.x = x;
        this.pos.y = y;
    }

    update(Keys){
        for(let Key of Keys){
            switch (Key.code) {
                case 87:
                    this.move(0, -1);
                break;
                case 83:
                    this.move(0, 1);
                break;
                case 68:
                    this.move(1, 0);
                break;
                case 65:
                    this.move(-1, 0);
                break;
            }
        }
    }

    // Draw player
    show(CTX){
        const ctx = CTX;
        ctx.setColors(this.color);
        ctx.autoColor(true);
        ctx.ellipse(
            this.pos,   // Pos (X, Y)
            this.sizes, // Sizes (W, H)
            null,       // ROTATION
            0, Math.PI * 2,  // Start & end Degrees
            false       // Center line
        );
    }
}


module.exports = {
    Player: Player,
    
}