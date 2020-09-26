(function(){
    class Player {
        constructor(CTX, color){
            this.ctx = CTX;
            this.color = color;
            this.pos = protos.Vector(100, 100);
            this.sizes = protos.Vector(20, 50);
            this.vel = protos.Vector(5, 5);
        }

        move(x, y){
            this.pos.x += x * this.vel.x;
            this.pos.y += y * this.vel.y;
        }
        update(){
            for(let Key of protos.Keys){
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
                globalThis.sendMessage({
                    keys: protos.Keys 
                });
            }
        }
        // Draw player
        show(){
            const ctx = this.ctx;
            ctx.setColors(this.color);
            ctx.autoColor(true);
            ctx.ellipse(
                this.pos,   // Pos (X, Y)
                this.sizes, // Sizes (W, H)
                null,       // ROTATION
                0, PI * 2,  // Start & end Degrees
                false       // Center line
            );
        }
    }

    globalThis.player = Player;
})()