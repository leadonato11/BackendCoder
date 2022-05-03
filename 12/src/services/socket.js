const socketIo = require("socket.io");
const { controller } = require("../controller/articles");

let io;

const initWsServer = (server) => {
  io = socketIo(server);
  io.on("connection", (socket) => {
    console.log("Nueva Conexion establecida!", socket.id);

    socket.on("loadProducts", async () => {
      const articles = await controller.getAll();
      socket.emit("productsLoaded", articles);
    });

    //Listen for chat messages
    socket.on("chatMessage", (msg) => {
      const user = getCurrentUser(socket.client.id);
      data.username = user.username;
      data.text = msg;
      io.to(user.room).emit("message", formatMessages(data));
    });
  });

  return io;
};

const getWsServer = () => {
  return io;
};

module.exports = {
  initWsServer,
  getWsServer,
};
