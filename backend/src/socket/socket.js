module.exports = (io) => {
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("sendMessage", ({ receiverId, message }) => {
      const receiverSocket = onlineUsers.get(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("newMessage", message);
      }
    });

    socket.on("disconnect", () => {
      onlineUsers.forEach((value, key) => {
        if (value === socket.id) onlineUsers.delete(key);
      });
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });
};