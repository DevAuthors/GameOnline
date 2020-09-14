(function(Global){
setTimeout(() => {
    console.clear();
    
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
                        //Return = socket.userID;
                    break;
                }
            break;
            case "push":
                switch (Data.value.type) {
                    case 'userID':
                        Global.localStorage.setItem('userID', Data.value.value)
                    break;
                }
            break;
        }

        if(Data.response){
            Socket.emit('backend', {
                type: ReturnType,
                value: Return,
                response: response || false
            });
        }
    })

    Global.Socket = Socket;
}, 500);
})(window || this)