const CTX = new protos.Canvas(document.querySelector('canvas'));
CTX.resize(protos.W100, protos.H100);
function setup() {
CTX.Setup();

    
let i = 0;
let o = false;

protos.loop(() => {
    CTX.setColors("#ffffff");
    CTX.rect(protos.Vector(0, 0), protos.Vector(protos.W100, protos.H100));
    CTX.setColors("#000000")
    
    i += 0.1;
    if(i >= PI * 2){
        o = !o;
        i = 0;
    }
    
    CTX.ellipse(protos.Vector(55, 35), protos.Vector(25, 30), 0, i, PI * 2, o);
}, 1000/60)
};