const Plane = {
    "grass": ["#654321", "#654321",
            "#008000", "#654321",
            "#654321", "#654321"]
};

const textures = {};

const texturesName = {
   "grass": ["/assets/imgs/grass0.jpg", "/assets/imgs/grass0.jpg",
            "/assets/imgs/grass1.jpg", "/assets/imgs/grass2.jpg",
            "/assets/imgs/grass0.jpg", "/assets/imgs/grass0.jpg"]
}

function loadAllTextures(){
    //const pg = createGraphics();
    for(let TextureName in texturesName){
        if(texturesName.hasOwnProperty(TextureName)){
            textures[TextureName] = new Array();
            for(let NameTexture of texturesName[TextureName]){
                textures[TextureName].push(loadImage(NameTexture));
            }
        }
    }
}