const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    Username: String,
    Password: String,
    Email: String,
    SocketId: String,
    ID: Number,
    Extra: Object
});

User.set("timestamps", true);

module.exports = mongoose.model("user", User, "Users");