const socketio = require('socket.io')

const DB = require('../models/controller');
const Game2D = require('./Game2D');

let users = 0;

const DebugMode = {
    ON: true,
    addUser: false,
    clearUsers: true,

    Default: function(nameProp, def){
        DD(nameProp, "nameProp", "String");
        DD(def, "def", "Boolean");
        return this.ON ? 
                this[nameProp] ? 
                    true : 
                    false : 
                def ? 
                    true :
                    false;
    }
}

function DD(val, valname, ss){
    if(typeof val === ss.toLowerCase()){
        return true;
    }else{
        throw new TypeError(`${valname}: ${ss}, is: ${typeof val}`); 
    }
}


let Players = {};


function run(server, db){
    const io = socketio.listen(server);

    //#region --- Clear all users from DB
    if(DebugMode.Default('clearUsers', false)){
        DB.rmv.user({
            type: "All",
            value: "Admin in DevAuthors"
        });
    }
    //#endregion

    //#region --- Update users count
    DB.count.user()
        .then(N => {
            users = N;
        })
        .catch(err => {
            console.error(err);
        });
    //#endregion
    
    let msgs = [];

    setInterval(() => {
        io.sockets.emit('updtPos', Players);
        msgs = [];
    }, 1000 / 30);

    io.on('connect', socket => {
        socket.userID = users;
        Players[socket.id] = new Game2D.Player(
            {x: 100, y: 100}, 
            "#f55", 
            {x: 20, y: 50}, 
            {x: 4, y: 4}
        );

        socket.on('updtPos', Data => {
            for(D of Data){
                console.log(D);
                Players[socket.id].update(D.keys);
            }
        });

        socket.on('backend', Data => {
            let Return;
            let ReturnType;
            let response;

            switch (Data.type) {
                case "fetch":
                    ReturnType = "push";
                    switch (Data.value) {
                        case "userID":
                            Return = {
                                type: "userID",
                                value: socket.userID
                            };
                        break;
                    }
                break;
                case "exec":
                    eval(Data.value);
                break;
            }

            if(Data.response){
                io.emit('backend', {
                    type: ReturnType,
                    value: Return,
                    response: response || false
                })
            }
        })

        if(DebugMode.Default('addUser', true)){
            DB.add.user({
                Username: 'guest',
                Password: 'secret',
                Email: 'guest@devauthors.com',
                SocketId: socket.id,
                ID: users++,
                Extra: {}
            });
        }
    });

    return io;
}

module.exports = {
    run
}