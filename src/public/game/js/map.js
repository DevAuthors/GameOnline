function GrassBlock(X, Y, Z){
    return new Protos.Block(textures.grass, createVector(X, Y, Z), 25);
}

const Map = {
    PlayerRespawn: null,
    map: null,


    Setup(){
        this.PlayerRespawn = createVector(0, 0, 0);
        this.map = [
            [GrassBlock(-1, -1, -1), GrassBlock(-1, 0, 0), GrassBlock(-1, -1, 1)],
            [GrassBlock(0, 0, -1), GrassBlock(0, 1, 0), GrassBlock(0, 0, 1)],
            [GrassBlock(1, -1, -1), GrassBlock(1, 0, 0), GrassBlock(1, -1, 1)]
        ]
    }
}