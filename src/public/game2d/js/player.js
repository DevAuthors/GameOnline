(function(){
    class Player {
        constructor(CTX){
            this.ctx = CTX;
            this.pos = protos.Vector(0, 0);
        }
    }

    globalThis.player = Player;
})()