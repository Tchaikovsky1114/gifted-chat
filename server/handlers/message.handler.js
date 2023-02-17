let currentMessageId = 1;

function createMessage(user,messageText) {
  return {
  _id: currentMessageId++,
  text: messageText,
  createAt: new Date(),
  user: {
    _id_: user.userId,
    name:user.username,
    avatar: user.avatar
  }
}
}

function handleMessage(socket, userIds) {
  socket.on('message',(messageText) => {
    const user = userIds[socket.id];
    const message = createMessage(user, messageText);
    console.log(message);
    socket.broadcast.emit('message',message);
  })
}

module.exports = { handleMessage }