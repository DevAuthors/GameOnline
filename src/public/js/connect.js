(function(){
globalThis.drawSocket = function(){};
setTimeout(() => {
    //console.clear();
    
    const Socket = io();

    Socket.on('msg', Data => {
        switch (Data.type) {
            case "draw":
                // globalThis.drawQueue[Data.socket.id] = {
                //     type: Data.value.type, 
                //     pos: Data.value.pos, 
                //     sizes: Data.value.sizes};
            break;
        }
    });

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

    function DrawSocket(type, pos, sizes){
        Socket.emit("msg", {
            type: 'draw',
            value: {
                type: type,
                pos: pos,
                sizes: sizes
            }
        });
    }

    globalThis.Socket = Socket;
    globalThis.drawSocket = DrawSocket;
}, 500);
})()