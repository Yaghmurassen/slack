const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const routerChannels = require('./api/routes/channels');
const routerMessages = require('./api/routes/messages');
const routerUsers = require('./api/routes/users');

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api/channels', routerChannels);
app.use('/api/messages', routerMessages);
app.use('/api/users', routerUsers);

const server = http.createServer(app);
const io = socketIO(server);

app.io = io;
io.on('connection', socket => {
  console.log('user connected');

  socket.on('getMessageFromClient', data => {
    io.emit('sendMessagesToclient', data);
    console.log('message : ', data);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

server.listen(port, '0.0.0.0', function() {
  console.log(`Example app listening on port ${port}!`);
});