const port = 4001
const io = require('socket.io')();
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
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("action", { type: "users_online", data: createUserOnline() })
  });
  
  socket.on("action", action => {
    switch(action.type) {
      case "server/hello":
        socket.emit('action', { type: "message", data: "Good day!" });
        break;
      case "server/join":
        users[socket.id].username = action.data;
        users[socket.id].avatar = createUserAvatarUrl();
        socket.emit("action", { type: 'users_online', data: createUserOnline() })
        break;
    }
  })
})


io.listen(port);