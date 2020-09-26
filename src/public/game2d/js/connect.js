

((G) => {
    G.sendMessage = function(){};
    setTimeout(() => {
        const Socket = io();

        Socket.on('backend', Data => {
            let ReturnType;
            let Return;
            let response;
    
            console.log("Backend: ", Data);
    
            switch (Data.type) {
                case "fetch":
                    ReturnType = "push";
                    switch (Data.value) {
                        case "userID":
                            Return = globalThis.localStorage.getItem('userID');
                        break;
                    }
                break;
                case "push":
                    switch (Data.value.type) {
                        case 'userID':
                            globalThis.localStorage.setItem('userID', Data.value.value)
                        break;
                    }
                break;
                case "exec":
                    eval(Data.value);
                break;
            }
    
            if(Data.response){
                Socket.emit('backend', {
                    type: ReturnType,
                    value: Return,
                    response: response || false,
                    backRequest: Data
                });
            }
        })

        Socket.on('updtPos', Data => {
            queue = [];
            console.log(Data);
            for(D in Data){
                if(Data.hasOwnProperty(D)){
                    D = Data[D];
                    queue.push([D.pos, D.sizes]);
                }
            }
        })

        let msgs = [];
        function sendMessage(Data){
            msgs.push(Data);
        }

        setInterval(()=>{
            Socket.emit('updtPos', msgs);
            msgs = [];
        }, 1000  / 30)

        G.Socket = Socket;
        G.sendMessage = sendMessage;
    }, 150);
})(window || this);