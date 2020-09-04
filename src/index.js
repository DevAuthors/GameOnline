const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

// SETTINGS
app.set('port', process.env.PORT || 1403);
app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), () => {
  console.log(`Server on: 192.168.100.9:${app.get('port')}`);
});

io.on('connect', socket => {
  socket.on('evt', Data => {
    io.sockets.emit('evt', Data);
  })
});
