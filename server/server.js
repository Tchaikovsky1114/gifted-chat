const express = require('express');
const app = express();
const port = 4001
const server = app.listen(port);
const io = require('socket.io')(server);
const messageHandler = require('./handlers/message.handler')

const users = {};

function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://picsum.photos/${rand1}/${rand2}`
}

function createUserOnline() {
  const values = Object.values(users);
  const onlyWithUsername = values.filter((user) => user.username !== undefined);
  return onlyWithUsername;
}

io.on('connection', (socket) => {
  
  users[socket.id] = { userId: Math.random().toString(16) };
  socket.on('join', username => {
    users[socket.id].username = username;
    users[socket.id].avatar = createUserAvatarUrl();
    
    messageHandler.handleMessage(socket,users);
    io.emit('users_online',{data: createUserOnline()});
    
    socket.on('disconnect', () => {
      delete users[socket.id];
      io.emit('users_online',{data: createUserOnline()});
    })

  })
  
})


io.listen(server);