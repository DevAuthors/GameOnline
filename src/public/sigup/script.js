//#region --- Camp AutoChange
(function(){
    const inputs = [...document.querySelectorAll('input')]
    for(let inp of inputs) {
        const i = inputs.indexOf(inp);
        inp.addEventListener('keydown', e => {
            if(e.keyCode === 13) {
                inputs[i + 1]?.focus();
                globalThis.CampActual = i + 1 >= 3 ? 
                    globalThis.CampActual : 
                    i + 1;
                if(i === 2){
                    globalThis.remoteInput();
                }
            }
        });
        inp.addEventListener('keydown', e => {
            if(e.keyCode === 08 && inp.value === ""){
                inputs[i - 1]?.focus();
                globalThis.CampActual =  i - 1 < 0 ? 
                    globalThis.CampActual : 
                    i - 1;
            }
        })
    }

    globalThis.CampActual = 0;
})();
//#endregion

//#region --- Show/Hide Password 
(function(){
    document.querySelector("#visible").addEventListener("click", () => {
        document.querySelector('#pass').type = "text";
        getActualInput().focus();
        document.querySelector("#visible").style.display = 'none';
        document.querySelector("#hide").style.display = 'block';
    })
    
    document.querySelector("#hide").addEventListener("click", () => {
        document.querySelector('#pass').type = "password";
        getActualInput().focus();
        document.querySelector("#visible").style.display = 'block';
        document.querySelector("#hide").style.display = 'none';
    })
})();
//#endregion

//#region --- Login Button
(function(){
    function rinp(){
        if(!globalThis.logged){
            console.log("logged");
            globalThis.logged = true;
        }
    };
    globalThis.remoteInput = rinp;
})();
//#endregion

//#region --- Helper Function
function getActualInput(){
    return [...document.querySelectorAll('input')][globalThis.CampActual];
}
//#endregion