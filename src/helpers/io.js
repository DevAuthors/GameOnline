const socketio = require('socket.io')

const DB = require('../models/controller')

let users = 0;

const DebugMode = {
    ON: false,
    addUser: true,
    clearUsers: true,

    Default: function(nameProp, def){
        return this.ON ? this[nameProp] : def;
    }
}

function run(server, db){
    const io = socketio.listen(server);

    if(DebugMode.Default('clearUsers', false)){
        DB.rmv.user({
            type: "All",
            value: "Admin in DevAuthors"
        });
    }

    DB.count.user()
        .then(N => {
            users = N;
        })
        .catch(err => {
            console.error(err);
        });

    io.on('connect', socket => {
        socket.userID = users;

        socket.on('msg', Data => {
            Data.socket = socket;
            io.sockets.emit('msg', Data);
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