const socketIo = require("socket.io");
const { controller: articlesController } = require("../controller/articles");
const { controller: chatController } = require("../controller/chat");

let io;

const initWsServer = (server) => {
  io = socketIo(server);
  io.on("connection", (socket) => {
    console.log("Nueva Conexion establecida!", socket.id);

    socket.on("loadProducts", async () => {
      const articles = await articlesController.getAll();
      socket.emit("productsLoaded", articles);
    });

    socket.on("loadChat", async () => {
      const messages = await chatController.getAll();
      socket.emit("chatLoaded", messages);
    });

    socket.on("sendMessage", async (obj) => {
      const newMessage = await chatController.save(obj);
      sendToAll("newMessage", newMessage);
    });

    //Listen for chat messages
    // socket.on("loadChat", (message) => {
    //   const user = getCurrentUser(socket.client.id);
    //   data.username = user.username;
    //   data.message = message;
    //   io.to(user.room).emit("message", formatMessages(data));
    // });
  });

  return io;
};

const getWsServer = () => {
  return io;
};

const sendToAll = (eventName, data) => {
  io.emit(eventName, data);
};

module.exports = {
  initWsServer,
  getWsServer,
  sendToAll,
};
