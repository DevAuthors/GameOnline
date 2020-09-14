
// Import Modules
const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const mongoose = require('mongoose')

require("dotenv").config({path: 'variables.env'})

// Import my helpers
const DBHelper = require('./helpers/mongo')
const IOHelper = require('./helpers/io')

// Setup
const app = express();
const server = http.createServer(app);

// SETTINGS
app.set('port', process.env.PORT || 1403);
app.use(express.static(path.join(__dirname, 'public')));

// Initialize
server.listen(app.get('port'), () => {
  console.log(`Server on: ${app.get('port')}`);
});

(async () => {
  const db = await DBHelper.run();
  const io = IOHelper.run(server, db);
})()


