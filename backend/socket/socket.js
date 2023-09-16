let live_user_count = 0;
let ioInstance;

const socketIoConnection = (async = (io) => {
  ioInstance = io;
  io.on("connection", (socket) => {
    live_user_count++; // Increment user count on new connection
    io.emit("user count", { userCount: live_user_count }); // Send updated user count to all clients
    console.log("A user connected.");
    socket.on("disconnect", () => {
      live_user_count--; // Decrement user count on disconnection
      io.emit("user count", { userCount: live_user_count }); // Send updated user count to all clients
      console.log("A user disconnected.");
    });
  });
});

const emitNewChat = (chatData) => {
  ioInstance.emit("newChat", { chatData: chatData });
};

const emitUserNameChange = (name, userId) => {
  return new Promise((resolve, reject) => {
    ioInstance.emit("nameChange", { name, userId });
    resolve();
  });
};

const emitNewProfile = (ProfilePic, userId) => {
  return new Promise((resolve, reject) => {
    ioInstance.emit("profileUpdate", { ProfilePic, userId });
    resolve();
  });
};

module.exports = {
  socketIoConnection,
  emitNewChat,
  emitUserNameChange,
  emitNewProfile,
};
