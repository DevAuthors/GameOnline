const mongoose = require('mongoose');

require("dotenv").config({path: 'variables.env'})

const URL = process.env.DB_URL;

function run(){
    return new Promise((res, rej) => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);

        mongoose.connect(URL);

        mongoose.Promise = global.Promise;

        const db = mongoose.connection;

        db.once('open', () => {
            console.log("Connected to Data Base");
            res(db);
        })

        db.on('error', err => {
            console.error("Connect error: ", err.message);
            rej(err);
        });
    })
}

function set(Set, Value){
    if(Set === "url"){
        URL = Value;
    }
};

module.exports = {run, set};