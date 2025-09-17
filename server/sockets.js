// server/sockets.js
module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('Connected:', socket.id);
  
      // Receive a chat message from any client and broadcast to all clients
      socket.on('message', (msg) => {
        io.emit('message', msg);
      });
  
      socket.on('disconnect', () => {
        console.log('Disconnected:', socket.id);
      });
    });
  };
  